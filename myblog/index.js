$(function() {
    $('.zlf-menu li').each(function() {
        $(this).click(function() {
            $('.zlf-menu').find('.active').removeClass('active');
            $(this).addClass('active');
        })
    });
})