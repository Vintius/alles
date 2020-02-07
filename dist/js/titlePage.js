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
var $buttons = $('.js-layerButton'),
    $titleImages = $('.js-titleImage');
$buttons.click(function (event) {
  var $cur = $(this);

  if (!$cur.hasClass('isActive')) {
    $titleImages.filter('.isActive').toggleClass('isActive');
    $buttons.filter('.isActive').toggleClass('isActive');
    $cur.toggleClass('isActive');
    $titleImages.eq($cur.index()).toggleClass('isActive');
  }
}); //maps api

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
      bigIconOffset = [-21, -50];
  var myCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/Pins.svg',
    iconImageSize: defaultIconSize,
    iconImageOffset: defaultIconOffset
  }),
      $mapSlides = $('.js-washSlide');

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i], {}, {}));
  }

  myMap.geoObjects.add(myCollection);
  myMap.setType('yandex#hybrid');
  myMap.controls.remove('searchControl').remove('geolocationControl').remove('rulerControl').remove('trafficControl').remove('fullscreenControl').remove('typeSelector');
  myCollection.events.add('click', function (e) {
    var eventTarget = e.get('target');

    for (var _i = 0; _i < myCollection.getLength(); _i++) {
      myCollection.get(_i).options.unsetAll();
    }

    eventTarget.options.set({
      iconImageSize: bigIconSize,
      iconImageOffset: bigIconOffset
    });
    $mapSlides.filter('.is-active').removeClass('is-active');
    $mapSlides.eq(myCollection.indexOf(eventTarget)).addClass('is-active'); // debugger;
  });
  $mapSlides.on('click', function () {
    myCollection.get($(this).index()).events.fire('click');
  });
} //// Pagination


$(document).ready(function () {
  var $dots = $(".pagination__dot"),
      $current = $(".pagination__current"),
      $items = $(".js-paginationItem"),
      spacing = parseFloat($dots.css("width")) + parseFloat($dots.css("marginTop")) * 2,
      halfSpacing = spacing / 2,
      startPos,
      // itemsSpacing=450,
  lastItem = 0,
      lastItemR = 0,
      lastTime = Date.now();
  startPos = $dots.eq(0).position().left;
  $current.data("pos", {
    y: startPos
  });
  $dots.click(function (event) {
    var $cur = $(this);
    var dest = $cur.index() * spacing;
    TweenMax.to($current.data("pos"), 0.6, {
      y: startPos + dest,
      onUpdate: updatePos,
      onComplete: updatePos,
      ease: Quint.easeOut // ease:Elastic.easeOut,
      // easeParams:[1.1,0.6]

    });
    $items.filter('.isActive').toggleClass('isActive');
    $items.eq($cur.index()).toggleClass('isActive');
  });

  function updatePos() {
    var pos = $current.data("pos").y - startPos;
    var scale = pos % spacing;

    if (scale > halfSpacing) {} // scale=halfSpacing-(scale-halfSpacing);
    // scale=1-((scale/halfSpacing)*0.35);


    TweenMax.set($current, {
      y: pos + startPos,
      // scale:scale*1.4,
      force3D: true
    });
    var curItem = pos / spacing,
        curItemR = Math.round(curItem);
    var now = Date.now();
    var diff = now - lastTime;
    var deltaTime = diff / (1000 / 60);
    lastTime = now;

    if (lastItemR != curItemR) {
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