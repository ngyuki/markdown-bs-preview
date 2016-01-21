$(function(){
    $.get('!markdown-body?' + location.pathname).then(function(data){
        $('#markdown-body').html(data);
    });

    (function(){
        if (typeof(___browserSync___) === 'undefined') {
            setTimeout(arguments.callee, 100);
            console.log('timeput');
        } else {
            var io = ___browserSync___.socket;

            io.on('markdown:change', function(data){
                $.get('!markdown-body?' + location.pathname).then(function(data){
                    $('#markdown-body').html(data);
                })
            });
        }
    }());

    $('body').on('click', function(ev){
        var elem = ev.target;
        if (elem.tagName.toUpperCase() === 'A') {
            if (/^(\w+:)?\/\//.test(elem.getAttribute('href'))) {
                elem.target = '_blank';
            }
        }
    });
});
