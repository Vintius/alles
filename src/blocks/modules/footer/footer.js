import $ from 'jquery';
import "slick-slider";

let $footer = $('.js-footer'),
    $footerPics = $('.js-footer-pic'),
    $footerSlider = $('.js-footer-slider'),
    isFooterSliderInited = false;

// Footer news slider init
$(document).ready(function(){
    // Open/close footer by social pics
    $footerPics.on('click', function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $footer.removeClass('has-news-active');
        }
        else {
            $footerPics.removeClass('is-active');
            $(this).addClass('is-active');
            $footer.addClass('has-news-active');

            if (!isFooterSliderInited) {
                $footerSlider.slick({
                    infinite: true,
                    arrows: false,
                    variableWidth: true,
                    touchThreshold: 50,
                    swipeToSlide: true
                    //,
                    // slidesToScroll: 1,
                    // waitForAnimate: false
                    // slidesToShow: 6
                });
                isFooterSliderInited = true;
            }
        }
    });
});

