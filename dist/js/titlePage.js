/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/blocks/modules/titlePage/titlePage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/titlePage/titlePage.js":
/*!***************************************************!*\
  !*** ./src/blocks/modules/titlePage/titlePage.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import $ from "jquery";
// Title Layers selector
var $buttons = $('.js-layerButton'),
    $titleImages = $('.js-titleImage');
$buttons.click(function (event) {
  var $cur = $(this);

  if (!$cur.hasClass('is-active')) {
    $titleImages.filter('.is-active').toggleClass('is-active');
    $buttons.filter('.is-active').toggleClass('is-active');
    $cur.toggleClass('is-active');
    $titleImages.eq($cur.index()).toggleClass('is-active');
  }
}); //Opening title page points for portable devices
// $(document).ready(function() {
//     let $sign = $('.titlePage__sign');
//
//     $('body.portable').find($sign).on('click', function () {
//         $sign.filter('.is-opened').removeClass('is-opened');
//         $(this).addClass('is-opened');
//     });
// });
// Map and slides init

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.728870, 46.415600],
    zoom: 5
  }),
      coords = [[54.710454, 20.512733], [59.939095, 30.315868], [54.989342, 73.368212]],
      defaultIconSize = [30, 42],
      defaultIconOffset = [-16, -40],
      bigIconSize = [40, 52],
      bigIconOffset = [-21, -50]; // Map marks set

  var marksCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/Pins.svg',
    iconImageSize: defaultIconSize,
    iconImageOffset: defaultIconOffset
  }),
      $mapSlides = $('.js-washSlide');

  for (var i = 0; i < coords.length; i++) {
    marksCollection.add(new ymaps.Placemark(coords[i], {}, {}));
  }

  myMap.geoObjects.add(marksCollection); // Remove excess control elements

  myMap.setType('yandex#hybrid');
  myMap.controls.remove('searchControl').remove('geolocationControl').remove('rulerControl').remove('trafficControl').remove('fullscreenControl').remove('typeSelector'); // Add Map marks' click event

  marksCollection.events.add('click', function (e) {
    var eventTarget = e.get('target');

    for (var _i = 0; _i < marksCollection.getLength(); _i++) {
      marksCollection.get(_i).options.unsetAll();
    }

    eventTarget.options.set({
      iconImageSize: bigIconSize,
      iconImageOffset: bigIconOffset
    });
    $mapSlides.filter('.is-active').removeClass('is-active');
    $mapSlides.eq(marksCollection.indexOf(eventTarget)).addClass('is-active');
  }); // Add Map slides click event

  $mapSlides.on('click', function () {
    marksCollection.get($(this).index()).events.fire('click');
  });
} //// Pagination


$(document).ready(function () {
  var $dots = $(".pagination__dot"),
      $current = $(".pagination__current"),
      $items = $(".js-paginationItem"),
      spacing = parseFloat($dots.css("width")) + parseFloat($dots.css("marginTop")) * 2,
      startPos,
      lastItem = 0,
      lastItemR = 0,
      lastTime = Date.now();
  startPos = $dots.eq(0).position().left;
  $current.data("pos", {
    y: startPos
  });
  $dots.on('click', function () {
    var $this = $(this),
        dest = $this.index() * spacing;
    TweenMax.to($current.data("pos"), 0.6, {
      y: startPos + dest,
      onUpdate: updatePos,
      onComplete: updatePos,
      ease: Quint.easeOut
    });
    $items.filter('.is-active').toggleClass('is-active');
    $items.eq($this.index()).toggleClass('is-active');
  });

  function updatePos() {
    var pos = $current.data("pos").y - startPos,
        curItem = pos / spacing,
        curItemR = Math.round(curItem),
        now = Date.now(),
        diff = now - lastTime,
        deltaTime = diff / (1000 / 60);
    TweenMax.set($current, {
      y: pos + startPos,
      force3D: true
    });
    lastTime = now;

    if (lastItemR !== curItemR) {
      var $bounceDot = $dots.eq(lastItemR);
      TweenMax.to($bounceDot, 0.1, {
        y: 70 * ((curItem - lastItem) / deltaTime),
        ease: Quad.easeOut,
        onComplete: function onComplete() {
          TweenMax.to($bounceDot, 1, {
            y: 0,
            ease: Elastic.easeOut,
            easeParams: [1.1, 0.5]
          });
        }
      });
    }

    lastItem = curItem;
    lastItemR = curItemR;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=titlePage.js.map