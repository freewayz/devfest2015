/**
 * Called when a new section has been loaded.
 *
 * @param {Element} link element corresponding to new section
 * @param {Element} current now visible <section>
 * @param {Element} previous previously visible <section>
 */
function animateToSection(link, current, previous) {
    var effectNode = document.createElement('div');
    effectNode.className = 'circleEffect';

    var bounds = link.getBoundingClientRect();
    effectNode.style.left = bounds.left + bounds.width / 2 + 'px';
    effectNode.style.top = bounds.top + bounds.height / 2 + 'px';

    var header = document.querySelector('header');
    header.appendChild(effectNode);

    var newColor = 'hsl(' + Math.round(Math.random() * 255) + ', 46%, 42%)';
    var imageValue = Math.floor(Math.random() * 5) + 1  ;
    var imageName = '/images/devfest'+ imageValue +'.jpg';
    var imageBackground = "url("+imageName+")";
    effectNode.style.background = newColor;
    //effectNode.style.backgroundImage = imageBackground;

    var scaleSteps = [{transform: 'scale(0)'}, {transform: 'scale(1)'}];
    var timing = {duration: 2500, easing: 'ease-in-out'};

    var scaleEffect = new KeyframeEffect(effectNode, scaleSteps, timing);

    var fadeEffect = new SequenceEffect([buildFadeOut(previous), buildFadeIn(current)]);
    var allEffects = [scaleEffect, fadeEffect];

    // Play all animations within this group.
    var groupEffect = new GroupEffect(allEffects);
    var anim = document.timeline.play(groupEffect);
    anim.addEventListener('finish', function () {
        header.style.backgroundColor = newColor;
        //header.style.backgroundImage = imageBackground ;
        header.removeChild(effectNode);
    });
}

function buildFadeIn(target) {
    var steps = [
        {opacity: 0, transform: 'translate(0, 20em)'},
        {opacity: 1, transform: 'translate(0)'}
    ];
    return new KeyframeEffect(target, steps, {
        duration: 500,
        delay: -1000,
        fill: 'backwards',
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
}

function buildFadeOut(target) {
    var angle = Math.pow((Math.random() * 16) - 6, 3);
    var offset = (Math.random() * 20) - 10;
    var transform =
        'translate(' + offset + 'em, 20em) ' +
        'rotate(' + angle + 'deg) ' +
        'scale(0)';
    var steps = [
        {visibility: 'visible', opacity: 1, transform: 'none'},
        {visibility: 'visible', opacity: 0, transform: transform}
    ];
    return new KeyframeEffect(target, steps, {
        duration: 1500,
        easing: 'ease-in'
    });
}

window.addEventListener('load', function () {
    var icon = document.querySelector('.icon');

    var steps = [
        {color: 'hsl(206, 46%, 89%)', transform: 'scale(0.5)'},
        {color: 'hsl(13, 79%, 96%)', transform: 'scale(2)'},
        {color: 'red', transform: 'scale(1)'}
    ];

    var timing = {duration: 1, fill: 'both', easing: 'ease-in-out'};
    var anim = icon.animate(steps, timing);
    anim.pause();  // never play this animation forward

    function updatePlayer() {
        var top = window.scrollY;
        var height = document.body.scrollHeight - window.innerHeight;
        anim.currentTime = top / height;
    }

    updatePlayer();
    window.addEventListener('scroll', updatePlayer);
});

var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';


function initMap() {
    var myLatLng = {lat: 12.0040851, lng: 8.5449501};
    var trafficLayer = new google.maps.TrafficLayer();
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 17
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        title: "Central Hotel, Bompai Road, Kano",
        animation: google.maps.Animation.DROP

    });
    //trafficLayer.setMap(map);
    //marker.addListener('click', toggleBounce);

    marker.setMap(map);
    //var infowindow = new google.maps.InfoWindow({content: contentString});

    //function toggleBounce() {
    //
    //    infowindow.open(map, marker);
    //    if (marker.getAnimation() !== null) {
    //        marker.setAnimation(null);
    //    } else {
    //        marker.setAnimation(google.maps.Animation.BOUNCE);
    //    }
    //}


}



