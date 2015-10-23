var util = require("util");

var timers = 0;

function plugin(opts, bs)
{
    var logger = bs.getLogger("autoexit");
    var sockets = bs.io.sockets;

    // Namespace
    //console.log(sockets.constructor.name);
    //console.log(Object.keys(sockets));
    // Server
    //console.log(sockets.server.constructor.name);
    //console.log(Object.keys(sockets.server));
    // []
    //console.log(sockets.sockets.constructor.name);
    //console.log(Object.keys(sockets.sockets));

    sockets.on("connection", function(socket){
        logger.info(util.format("Socket connection (%s clients)", sockets.sockets.length));

        socket.on('disconnect', function () {
            logger.info(util.format("Socket disconnect (%s clients)", sockets.sockets.length));

            setTimeout(function(){
                logger.info(util.format("Delay timeout (%s clients)", sockets.sockets.length));

                // Socket
                //console.log(socket.constructor.name);
                //console.log(Object.keys(socket));
                // Client
                //console.log(socket.client.constructor.name);
                //console.log(Object.keys(socket.client));
                // Socket
                //console.log(socket.client.conn.constructor.name);
                //console.log(Object.keys(socket.client.conn));
                // Server
                //console.log(socket.client.conn.server.constructor.name);
                //console.log(Object.keys(socket.client.conn.server));

                timers--;

                if (sockets.sockets.length == 0 && timers == 0) {
                    logger.info("Exit process");
                    process.exit();
                }

            }, 2000);

            timers++;
        });
    });
}

module.exports = {
    plugin: plugin
}
