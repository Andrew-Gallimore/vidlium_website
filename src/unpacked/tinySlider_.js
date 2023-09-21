// ---- Built using WEBPACK ---- //

import { tns } from "tiny-slider";

var slider = tns({
    container: '.controls .scroll',
    fixedWidth: 350,
    center: true,
    items: 3,
    slideBy: 1,
    mouseDrag: true,
    controls: false,
    nav: false,
    autoplayButtonOutput: false,
    autoplay: true,
    speed: 2000,
    autoplayTimeout: 2500
});
console.log("We are in!")

var slider2 = tns({
    container: '.advanced-feeds .slideshow',
    fixedWidth: 350,
    center: true,
    items: 1,
    slideBy: 1,
    mouseDrag: false,
    controls: false,
    nav: false,
    autoplayButtonOutput: false,
    autoplay: false,
    speed: 300,
    autoplayResetOnVisibility: false
});
var slider2linked = tns({
    container: '.advanced-feeds .slideshow-linked',
    fixedWidth: 230,
    center: true,
    items: 1,
    slideBy: 1,
    mouseDrag: false,
    controls: false,
    nav: false,
    autoplayButtonOutput: false,
    autoplay: false,
    speed: 300,
    autoplayResetOnVisibility: false
});

// The function automatically going through slides
var slider2INDEX = 0;
setInterval(() => {
    slider2INDEX += 1;
    if(slider2INDEX > 5) {
        slider2INDEX = 0;
        slider2.goTo("next");
        slider2linked.goTo("next");
    }else {
        slider2.goTo(slider2INDEX);
        slider2linked.goTo(slider2INDEX);
    }
}, 2000);