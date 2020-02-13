import $ from "jquery";

let $header =$('.js-header'),
    fixEdge = $('.commonHeader').outerHeight() - $header.outerHeight();

function edgeCheck (){
    if ($('html').scrollTop() >= fixEdge) {
        $header.addClass('is-fixed');
    }
    else {
        $header.removeClass('is-fixed');
    }
}
edgeCheck();

$(document).scroll(function () {
    edgeCheck();
});