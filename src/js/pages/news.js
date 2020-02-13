import $ from 'jquery';
import 'slick-slider';

let $newsSlider = $('.js-news-slider'),
    $showNews = $('.js-show-news-button'),
    $modalContent = $('.js-modal-content'),
    $modalClose = $('.js-modal-close'),
    $modal = $('.js-modal');

$newsSlider.slick({
    infinite: false,
    arrows: false,
    variableWidth: true,
    waitForAnimate: true
    // slidesToShow: 6
});

$showNews.on('click', function() {
    let html = $(this).closest('.js-show-news').clone();

    $modalContent.html(html);
    $('.js-modal .js-show-news').removeAttr('style');
    $modal.show();
    $('.js-modal .js-modal-close').click(function () {
        modalClose();
    });
});

$modalClose.on('click', function(e) {
    modalClose();
});

function modalClose() {
    $modal.hide();
    $modalContent.html('');
}







// $newsSlider.on('mousewheel', function(event) {
//     event.preventDefault();
//     if (event.deltaY > 0) {
//         $(this).slick('slickPrev');
//     }
//     else {
//         $(this).slick('slickNext');
//     }
// });