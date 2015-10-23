$(function(){
    $.get('!markdown-body?' + location.pathname).then(function(data){
        $('#markdown-body').html(data);
    })

    setTimeout(function(){
        var io = ___browserSync___.socket;

        io.on('markdown:change', function(data){
            $.get('!markdown-body?' + location.pathname).then(function(data){
                $('#markdown-body').html(data);
            })
        });

    }, 1);
});
