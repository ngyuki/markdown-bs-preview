#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var path = require('path');
var url = require('url');

var markdownParse = require('./lib/parse');

if (process.argv.length < 3) {
    console.log(util.format('Usage: %s <markdown file>', path.basename(process.argv[1])));
    process.exit(1);
}

var filename = path.resolve(process.argv[2]);
process.chdir(path.dirname(filename));

var bs = require('browser-sync').create();

bs.use(require('./lib/bs-autoexit'))

bs.watch('*.md').on("change", function(fn){
    bs.sockets.emit("markdown:change", fn);
});

bs.init({
    server: {
        baseDir: path.dirname(filename),
        routes: {
            '/!/': __dirname + '/web/',
            '/node_modules': __dirname + '/node_modules',
        },
        middleware: function (req, res, next) {
            var u = url.parse(req.url);

            if (u.pathname.match(/\.md$/)) {
                var fn = __dirname + '/web/index.html';
                var content = fs.readFileSync(fn, 'utf-8');
                res.end(content);
                return;
            }

            if (u.pathname === '/!markdown-body') {
                var fn = path.join(path.dirname(filename), decodeURI(u.query));
                var content = fs.readFileSync(fn, 'utf-8');
                res.end(markdownParse(content));
                return;
            }

            next();
        },
    },
    startPath: '/' + path.basename(filename),
    open: true,
    online: false,
    ui: false,
    //logLevel: 'debug',
});
