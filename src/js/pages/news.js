import $ from 'jquery';
import 'slick-slider';

let $newsSlider = $('.js-news-slider');

$newsSlider.slick({
    infinite: false,
    arrows: false,
    variableWidth: true,
    waitForAnimate: true
});

// $newsSlider.on('mousewheel', function(event) {
//     event.preventDefault();
//     if (event.deltaY > 0) {
//         $(this).slick('slickPrev');
//     }
//     else {
//         $(this).slick('slickNext');
//     }
// });