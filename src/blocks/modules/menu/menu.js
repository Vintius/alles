// import $ from "jquery";

$('document').ready(function() {
    let $trigger = $('#hamburger'),
        isClosed = true,
        $header = $(".js-header");

    
    $(document).scroll(function () {
        // $menu.offset({top: $('html').scrollTop()});
        // $trigger.position({top: $menu.offset().top});
        if (!isClosed) {
            $trigger.click();
        }
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

    function burgerTime() {
        if (isClosed == false) {
            $trigger.removeClass('is-opened');
            $trigger.addClass('is-closed');
            isClosed = true;
        } else {
            $trigger.removeClass('is-closed');
            $trigger.addClass('is-opened');
            isClosed = false;
        }
    }
});