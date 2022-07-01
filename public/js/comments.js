$(document).ready(function () {
    $('#show').on('click', function () {
        $('.center').show();
        $(this).hide();
    })
    
    $('#close').on('click', function () {
        $('.center').hide();
        $('#show').show();
    })
});
