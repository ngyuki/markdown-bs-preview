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
});
