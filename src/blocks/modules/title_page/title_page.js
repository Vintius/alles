// import $ from "jquery";

// Title Layers selector
let $buttons = $('.js-layerButton'),
    $titleImages = $('.js-titleImage');

$buttons.click(function(event) {
    let $cur = $(this);

    if (!$cur.hasClass('is-active')){
        $titleImages.filter('.is-active').toggleClass('is-active');
        $buttons.filter('.is-active').toggleClass('is-active');
        $cur.toggleClass('is-active');
        $titleImages.eq($cur.index()).toggleClass('is-active');
    }
});

//Opening title page points for portable devices

// $(document).ready(function() {
//     let $sign = $('.titlePage__sign');
//
//     $('body.portable').find($sign).on('click', function () {
//         $sign.filter('.is-opened').removeClass('is-opened');
//         $(this).addClass('is-opened');
//     });
// });

// Map and slides init
let width = $(document).width(),
    zoom = 4,
    $mapSlides = $('.js-wash-slide'),
    $mapBg = $('.js-map-bg'),
    $mapSlidesBox = $('.js-wash-slides');

if (width < 720 && width >= 425) {
   zoom = 3;
}
else if (width < 425){
    zoom = 2;
}

$mapBg.on('click', function () {
    $mapSlides.removeClass('is-active');
    $(this).removeClass('is-active');
    $mapSlidesBox.removeClass('is-active');
});

ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map", {
                    center: [55.728870, 46.415600],
                    zoom: zoom
                }),
        coords = [
                    [54.710454, 20.512733],
                    [59.939095, 30.315868],
                    [54.989342, 73.368212]
                ],
        defaultIconSize     = [30, 42],
        defaultIconOffset   = [-16, -40],
        bigIconSize         = [40, 52],
        bigIconOffset       = [-21, -50];

    // Map marks set
    let marksCollection = new ymaps.GeoObjectCollection({}, {
                            iconLayout: 'default#image',
                            iconImageHref: 'img/svg/pins.svg',
                            iconImageSize: defaultIconSize,
                            iconImageOffset: defaultIconOffset
                        });

    for (let i = 0; i < coords.length; i++) {
        marksCollection.add(new ymaps.Placemark(coords[i], {}, {}));
    }

    myMap.geoObjects.add(marksCollection);

    // Remove excess control elements
    myMap.setType('yandex#hybrid');
    myMap.controls.remove('searchControl')
                  .remove('geolocationControl')
                  .remove('rulerControl')
                  .remove('trafficControl')
                  .remove('fullscreenControl')
                  .remove('typeSelector');

    // Add Map marks' click event
    marksCollection.events.add('click', function(e) {
        let eventTarget = e.get('target');

        for (let i = 0; i < marksCollection.getLength(); i++) {
            marksCollection.get(i).options.unsetAll();
        }

        eventTarget.options.set({
            iconImageSize: bigIconSize,
            iconImageOffset: bigIconOffset
        });

        $mapSlides.filter('.is-active').removeClass('is-active');
        $mapSlides.eq(marksCollection.indexOf(eventTarget)).addClass('is-active');
        $mapSlidesBox.addClass('is-active');
        $mapBg.addClass('is-active');
    });

    // Add Map slides click event
    $mapSlides.on('click', function () {
        marksCollection.get($(this).index()).events.fire('click');
    });
}

//// Pagination
$(document).ready(function() {
    let $dots = $(".pagination__dot"),
        $current = $(".pagination__current"),
        $items = $(".js-paginationItem"),
        spacing = parseFloat($dots.css("width")) + (parseFloat($dots.css("marginTop")) * 2),
        startPos,
        lastItem = 0,
        lastItemR = 0,
        lastTime = Date.now();

    startPos = $dots.eq(0).position().left;
    $current.data("pos",{y: startPos});

    $dots.on('click', function() {
        let $this = $(this),
            dest = ($this.index()) * spacing;

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
        let pos = $current.data("pos").y - startPos,
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
            let $bounceDot = $dots.eq(lastItemR);

            TweenMax.to($bounceDot, 0.1, {
                y: 70 * ((curItem - lastItem) / deltaTime),
                ease: Quad.easeOut,
                onComplete: function() {
                    TweenMax.to($bounceDot, 1, {
                        y: 0,
                        ease: Elastic.easeOut,
                        easeParams: [1.1, 0.5]
                    });
                }
            })
        }

        lastItem = curItem;
        lastItemR = curItemR;
    }
});
