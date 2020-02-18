import $ from 'jquery';
import 'slick-slider';

function modalClose() {
    $modal.hide();
    $modalContent.html('');
}

let $newsSlider = $('.js-news-slider'),
    $showNewsButton = $('.js-show-news-button'),
    $modalContent = $('.js-modal-content'),
    $modal = $('.js-modal');

$newsSlider.slick({
    infinite: false,
    touchThreshold: 50,
    arrows: false,
    variableWidth: true,
    swipeToSlide: true
});

$showNewsButton.on('click', function(e) {
    e.preventDefault();
    let html = $(this).closest('.js-show-news').clone();

    $modalContent.html(html);
    $modal.find('.js-show-news').removeAttr('style');
    $modal.show();
});

$('body').on('click', '.js-modal-close', function(e) {
    e.preventDefault();
    modalClose();
});
