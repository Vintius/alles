import $ from 'jquery';
import Inputmask from "jquery.inputmask";

$(document).ready(function() {
    $('.js-contact-us-tel').inputmask("+7(999)999-99-99");
});

$('.js-request-button').on('click', function () {
    $('.js-popup').addClass('is-active');
});

$('.js-popup-close').on('click', function () {
    $('.js-popup').removeClass('is-active');
});