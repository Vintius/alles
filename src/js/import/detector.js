(function( $ ) {
	$(function() {
		'use strict';

		var $body = $(document.body);
		
		//detecting user browser
		var isBrowser = {
			Firefox: function() {
				return (navigator.userAgent.match(/Firefox/i));
			},
			IE: function() {
				return (navigator.userAgent.match(/MSIE/i));
			},
			IE11: function () {
				return (navigator.userAgent.match(/Trident/i));
			}
		};		
		
		// detecting user device
		var isMobile = {
			Android: function() {
				return (navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i));
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() ||
				isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		var isTablet = {
			Android: function() {
				return (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i));
			},
			iOS: function() {
				return navigator.userAgent.match(/iPad/i);
			},
			any: function() {
				return (isTablet.iOS() || isTablet.Android());
			}
		};

		function deviceClass() {
			if (isMobile.any()) {
				$body.addClass('mobile');
			}

			if (isMobile.Android()) {
				$body.addClass('android');
			}

			if (isTablet.any()) {
				$body.addClass('tablet');
			}
			
			if (isBrowser.Firefox()) {
				$body.addClass('firefox');
			}
			
			if (isBrowser.IE()) {
				$body.addClass('explorer');
			}

			if (isBrowser.IE11()) {
				$body.addClass('explorer');
			}
		}

		window.isMobile = isMobile;
		window.isTablet = isTablet;

		deviceClass();
		
	});
})(jQuery);