import $ from 'jquery';
import "slick-slider";
import "jquery-mousewheel";

let $footer = $('.js-footer'),
    $footerPics = $('.js-footer-pic'),
    $footerSlider = $('.js-footer-slider');

$(document).ready(function(){
    $footerSlider.slick({
        infinite: false,
        arrows: false,
        variableWidth: true,
        waitForAnimate: false
        // slidesToShow: 1
    });
});

$footerSlider.on('mousewheel', function(event) {
    // console.log(event.deltaX, event.deltaY, event.deltaFactor);
    event.preventDefault();
    if (event.deltaY > 0) {
        $(this).slick('slickPrev');
    }
    else {
        $(this).slick('slickNext');
    }
});

$footerSlider.on('edge', function () {
    console.log('edge was hit');
});

$footerPics.on('click', function () {
    if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
        $footer.removeClass('news-active');
    }
    else {
        $footerPics.filter('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $footer.addClass('news-active');
    }

});