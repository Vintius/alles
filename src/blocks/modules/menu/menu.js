import $ from "jquery";
import "jquery-touchswipe";

$('document').ready(function() {
    let $menuTrigger = $('#hamburger'),
        isClosed = true,
        $header = $(".js-header");

    function burgerTime() {
        if (isClosed === false) {
            $menuTrigger.removeClass('is-opened');
            $menuTrigger.addClass('is-closed');
            isClosed = true;
        } else {
            $menuTrigger.removeClass('is-closed');
            $menuTrigger.addClass('is-opened');
            isClosed = false;
        }
    }
    
    // $(window).on('scroll', function (e) {
    //     console.log(e.currentTarget);
    //
    //     // e.preventDefault(); - только wheel
    //
    //     //debugger;
    //     if (!isClosed) {
    //         $menuTrigger.click();
    //     }
    // });

    let sideMenu = 940;

    $('.js-menu').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            // console.log(event, direction, distance);

            if (phase === "end" && direction === "left" && window.innerWidth <= sideMenu) {
                $menuTrigger.click();
            }
        },
        triggerOnTouchEnd: false,
        threshold: 30
    });

    $('.js-search').click(function () {
        $(this).focus();
    });

    // $('.menu__rightBlockSearchInput').swipe({
    //     swipeStatus: function (event) {
    //
    //     }
    // });
    
    
    $menuTrigger.click(function() {
        burgerTime();

        if (isClosed) {
            $header.removeClass('is-opened');
        }
        else {
            $header.addClass('is-opened');
        }
    });
});