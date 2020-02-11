import $ from 'jquery';
import 'slick-slider';
import 'jquery-mousewheel';

let $newsSlider = $('.js-news-slider');

$newsSlider.slick({
    infinite: false,
    arrows: false,
    variableWidth: true,
    waitForAnimate: false
});

$newsSlider.on('mousewheel', function(event) {
    // console.log(event.deltaX, event.deltaY, event.deltaFactor);
    event.preventDefault();
    if (event.deltaY > 0) {
        $(this).slick('slickPrev');
    }
    else {
        $(this).slick('slickNext');
    }
});