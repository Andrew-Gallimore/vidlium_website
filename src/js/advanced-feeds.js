//Variables for the custom lines between video-feeds and the center-image
var posMiddle = document.querySelector(".advanced-feeds .center-image");

var posONE = document.querySelector(".advanced-feeds .video.one");
// var lineONE = document.querySelector(".advanced-feeds svg.one");
// var heightOffsetONE = 200;

var posTWO = document.querySelector(".advanced-feeds .video.two");
// var lineTWO = document.querySelector(".advanced-feeds svg.two");
// var heightOffsetTWO = -100;

var posTHREE = document.querySelector(".advanced-feeds .video.three");
// var lineTHREE = document.querySelector(".advanced-feeds svg.three");
// var heightOffsetTHREE = -10;

// // Continuely updating lines
// setInterval(() => {
//     AdjustLine(heightOffsetONE, posONE, lineONE);
//     AdjustLine(heightOffsetTWO, posTWO, lineTWO);
//     AdjustLine(heightOffsetTHREE, posTHREE, lineTHREE, true);
// }, 75);

// // Function for moving/adjusting a line
// function AdjustLine(LineHeightOffset, videoPos, line, reverse=false) {
//     var mult = 1;
//     if(reverse) {
//         mult = -1;
//     }
    
//     // Calc and setting hight offset of the line's origin to match the video element
//     var matrix = new WebKitCSSMatrix(getComputedStyle(videoPos).transform);
//     var trigOffset = matrix.m42;
//     var halfOfHight = videoPos.getBoundingClientRect().height / 2;
//     var videoOffset = Number(getComputedStyle(videoPos).top.slice(0, -2));

//     line.style.top = (trigOffset + halfOfHight + videoOffset) + "px";
    
//     // Calc and setting the hight offset of the other side of the line, so its counteracting the trigOffset
//     var heightOffset = LineHeightOffset - trigOffset;
//     line.querySelector("line").setAttribute("y2", heightOffset);

//     // Calcing and setting the new width the line should be
//     var halfOfWidth = videoPos.getBoundingClientRect().width / 3;
//     var halfOfMiddleWidth = posMiddle.getBoundingClientRect().width / 2;

//     var totalWidth = (window.innerWidth * 0.34) - halfOfWidth - halfOfMiddleWidth;
//     line.querySelector("line").setAttribute("x2", mult * totalWidth);
    
//     // Setting the left offset of the origin of the line so that it is on the edge of the video
//     line.style.transform = 'translateX(' + mult * halfOfWidth + 'px)';
// }


var colorPart = 'rgba(240, 202, 83, '
var config = {
    startPlug: 'behind',
    endPlug: 'behind',
    path: 'magnet',
    size: 3,
    dash: {animation: true},
    gradient: true,
    color: colorPart + 1 + ")",
    startPlugColor: colorPart + 0 + ")",
    endPlugColor: colorPart + 1 + ")",
}
var firstConfig = config;
firstConfig.startSocketGravity = [50, 100];

// New leader line 1
var line = new LeaderLine(
    LeaderLine.pointAnchor(posONE, {x: '85%', y: '80%'}),
    LeaderLine.pointAnchor(posMiddle, {x: '0%', y: '40%'}),
    firstConfig);
line.hide()

// New leader line 2
var line2 = new LeaderLine(
    LeaderLine.pointAnchor(posTWO, {x: '90%', y: '50%'}),
    LeaderLine.pointAnchor(posMiddle, {x: '0%', y: '70%'}),
    config);
line2.hide()

// New leader line 2
var line3 = new LeaderLine(
    posTHREE, 
    posMiddle, 
    config);
line3.hide()


    
// Adding listeners so we can animate the line in when the video animates in
posONE.addEventListener("animationstart", (e) => {
    if(e.animationName === "fadeIn") {
        line.show();
    }else {
        line.hide();
    }
})
posTWO.addEventListener("animationstart", (e) => {
    if(e.animationName === "fadeIn") {
        line2.show();
    }else {
        line2.hide();
    }
})
posTHREE.addEventListener("animationstart", (e) => {
    if(e.animationName === "fadeIn") {
        line3.show();
    }else {
        line3.hide();
    }
})

setInterval(() => {
    line.position();
    line2.position();
    line3.position();
}, 75, line, line2, line3);