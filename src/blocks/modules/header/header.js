import $ from "jquery";

let $header =$('.js-header'),
    fixEdge = $('.commonHeader').outerHeight() - $header.outerHeight();

function edgeCheck (){
    if ($('html').scrollTop() >= fixEdge) {
        $header.addClass('isFixed');
    }
    else {
        $header.removeClass('isFixed');
    }
}
edgeCheck();

$(document).scroll(function () {
    edgeCheck();
});