import $ from "jquery";
import "jquery-touchswipe";

$('document').ready(function() {
    let $trigger = $('#hamburger'),
        isClosed = true,
        $header = $(".js-header");

    function burgerTime() {
        if (isClosed === false) {
            $trigger.removeClass('is-opened');
            $trigger.addClass('is-closed');
            isClosed = true;
        } else {
            $trigger.removeClass('is-closed');
            $trigger.addClass('is-opened');
            isClosed = false;
        }
    }
    
    $(document).on('scroll', function (e) {
        console.log(e.target);

        // if (e.target) {
        //     debugger;
        //
        //     return
        // }

        if (!isClosed) {
            $trigger.click();
        }
    });

    $('.js-menu').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            // console.log(direction, distance);

            if (phase === "end" && direction === "left") {
                $trigger.click();
            }
        },
        triggerOnTouchEnd: false,
        threshold: 30
    });
    
    
    $trigger.click(function() {
        burgerTime();

        if (isClosed) {
            $header.removeClass('is-opened');
        }
        else {
            $header.addClass('is-opened');
        }
    });
});