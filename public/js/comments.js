$(document).ready(function () {
    $('.show').on('click', function () {
        var parent = this.parentNode;
        console.log(parent.children[4]);
        // parent.children[4].show();
        parent.querySelector('.center').style.display = "block";
        //$('.center').show();
        $(this).hide();
    })
    
    $('.close').on('click', function () {
        $('.center').hide();
        $('.show').show();
    })
});
