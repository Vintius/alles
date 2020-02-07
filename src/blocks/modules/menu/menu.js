// import $ from "jquery";

$('document').ready(function () {
    var $trigger = $('#hamburger'),
        isClosed = true,
        $menu = $(".js-menu"),
        $triggerPos = $trigger.position().top;

    
    $(document).scroll(function () {
        // $menu.offset({top: $('html').scrollTop()});
        // $trigger.position({top: $menu.offset().top});
        if (!isClosed) {
            $trigger.click();
        }
    });
    
    
    $trigger.click(function () {
        burgerTime();

        if (isClosed) {
            $menu.removeClass('isOpened');
        }
        else {
            $menu.addClass('isOpened');
        }
    });

    function burgerTime() {
        if (isClosed == false) {
            $trigger.removeClass('is-open');
            $trigger.addClass('is-closed');
            isClosed = true;
        } else {
            $trigger.removeClass('is-closed');
            $trigger.addClass('is-open');
            isClosed = false;
        }
    }
});

// let $window        = $('window');
// let $header        = $('.js-header');
// let $menu          = $('.js-menu');
// let indent         = $header.innerHeight();
// let checkMenuClass = function() {
//     let scrollTop = $window.scrollTop();
//     $menu.toggleClass('is-fixed', scrollTop > indent);
// };
//
// $(window).on('load scroll', function() {
//     checkMenuClass();
// });
//
// $(window).on('resize', function() {
//     indent = $header.innerHeight();
//     checkMenuClass();
// });