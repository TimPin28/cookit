$(document).ready(function () {
    $('.show').on('click', function () {
        var parent = this.parentNode;
        parent.querySelector('.center').style.display = "block";
        $(this).hide();
    })
    
    $('.close').on('click', function () {
        $('.center').hide();
        $('.show').show();
    })
});
