// import $ from "jquery";

let $buttons = $('.js-layerButton'),
    $titleImages = $('.js-titleImage');

$buttons.click(function(event) {
    let $cur = $(this);

    if (!$cur.hasClass('isActive')){
        $titleImages.filter('.isActive').toggleClass('isActive');
        $buttons.filter('.isActive').toggleClass('isActive');
        $cur.toggleClass('isActive');
        $titleImages.eq($cur.index()).toggleClass('isActive');
    }
});

//maps api

ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map", {
                center: [55.728870, 46.415600],
                zoom: 5
                }),
        coords = [
                [54.710454, 20.512733],
                [59.939095, 30.315868],
                [54.989342, 73.368212]
                ],
        defaultIconSize = [30, 42],
        defaultIconOffset = [-16, -40],
        bigIconSize = [40, 52],
        bigIconOffset = [-21, -50];

    let myCollection = new ymaps.GeoObjectCollection({}, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/svg/Pins.svg',
                        iconImageSize: defaultIconSize,
                        iconImageOffset: defaultIconOffset
                        }),
        $mapSlides = $('.js-washSlide');

    for (let i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i], {}, {
        }));
    }

    myMap.geoObjects.add(myCollection);

    myMap.setType('yandex#hybrid');
    myMap.controls.remove('searchControl')
                  .remove('geolocationControl')
                  .remove('rulerControl')
                  .remove('trafficControl')
                  .remove('fullscreenControl')
                  .remove('typeSelector');

    myCollection.events.add('click', function (e) {
        let eventTarget = e.get('target');

        for (let i = 0; i < myCollection.getLength(); i++){
            myCollection.get(i).options.unsetAll();
        }

        eventTarget.options.set({
            iconImageSize: bigIconSize,
            iconImageOffset: bigIconOffset});


        $mapSlides.filter('.is-active').removeClass('is-active');
        $mapSlides.eq(myCollection.indexOf(eventTarget)).addClass('is-active')

        // debugger;
    });




    $mapSlides.on('click', function () {
        myCollection.get($(this).index()).events.fire('click');
    });
}



//// Pagination

$(document).ready(function(){
    var $dots=$(".pagination__dot"),
        $current=$(".pagination__current"),
        $items=$(".js-paginationItem"),
        spacing=parseFloat($dots.css("width"))+(parseFloat($dots.css("marginTop"))*2),
        halfSpacing=spacing/2,
        startPos,
        // itemsSpacing=450,
        lastItem=0,
        lastItemR=0,
        lastTime=Date.now();

    startPos=$dots.eq(0).position().left;
    $current.data("pos",{y:startPos});

    $dots.click(function(event){
        var $cur=$(this);

        var dest=($cur.index())*spacing;
        TweenMax.to($current.data("pos"),0.6,{
            y:startPos+dest,
            onUpdate:updatePos,
            onComplete:updatePos,
            ease:Quint.easeOut
            // ease:Elastic.easeOut,
            // easeParams:[1.1,0.6]
        });

        $items.filter('.isActive').toggleClass('isActive');
        $items.eq($cur.index()).toggleClass('isActive');
    });

    function updatePos(){
        var pos=$current.data("pos").y-startPos;
        var scale=pos%spacing;
        if(scale>halfSpacing){
            // scale=halfSpacing-(scale-halfSpacing);
        }
        // scale=1-((scale/halfSpacing)*0.35);
        TweenMax.set($current,{
            y:pos+startPos,
            // scale:scale*1.4,
            force3D:true
        });

        var curItem=pos/spacing,
            curItemR=Math.round(curItem);

        var now=Date.now();
        var diff=now-lastTime;
        var deltaTime=diff/(1000/60);
        lastTime=now;
        if(lastItemR!=curItemR){
            var $bounceDot=$dots.eq(lastItemR)
            TweenMax.to($bounceDot,0.1,{
                y:70*((curItem-lastItem)/deltaTime),
                ease:Quad.easeOut,
                onComplete:function(){
                    TweenMax.to($bounceDot,1,{
                        y:0,
                        ease:Elastic.easeOut,
                        easeParams:[1.1,0.5]
                    })
                }
            })
        }
        lastItem=curItem;
        lastItemR=curItemR;
    }
});