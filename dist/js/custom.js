var posMiddle = document.querySelector(".advanced-feeds .center-image");

var posONE = document.querySelector(".advanced-feeds .video.one");
var lineONE = document.querySelector(".advanced-feeds svg.one");
var heightOffsetONE = 200;

var posTWO = document.querySelector(".advanced-feeds .video.two");
var lineTWO = document.querySelector(".advanced-feeds svg.two");
var heightOffsetTWO = -100;

var posTHREE = document.querySelector(".advanced-feeds .video.three");
var lineTHREE = document.querySelector(".advanced-feeds svg.three");
var heightOffsetTHREE = -10;

setInterval(() => {
    // var LineHeightOffset = heightOffsetONE;
    // var videoPos = posONE;
    // var line = lineONE;
    AdjustLine(heightOffsetONE, posONE, lineONE);
    AdjustLine(heightOffsetTWO, posTWO, lineTWO);
    AdjustLine(heightOffsetTHREE, posTHREE, lineTHREE, true);
}, 75);

function AdjustLine(LineHeightOffset, videoPos, line, reverse=false) {
    var mult = 1;
    if(reverse) {
        mult = -1;
    }
    // Setting transform for the first line
    // console.log(videoPos.getBoundingClientRect().height)

    // Calc and setting hight offset of the line's origin to match the video element
    // var trigOffset = (Number(videoPos.style.getPropertyValue('--trig-px').slice(0, -2))/2) - (window.innerHeight * 0.02);
    // var trigOffset = (Number(videoPos.style.getPropertyValue('--trig-px').slice(0, -2))) + (window.innerHeight * 0.02);
    var matrix = new WebKitCSSMatrix(getComputedStyle(videoPos).transform);
    var trigOffset = matrix.m42;
    var halfOfHight = videoPos.getBoundingClientRect().height / 2;
    var videoOffset = Number(getComputedStyle(videoPos).top.slice(0, -2));
    // console.log(getComputedStyle(videoPos).transform)
    // console.log(matrix.m42)
    // console.log(videoOffset)
    line.style.top = (trigOffset + halfOfHight + videoOffset) + "px";
    
    // Calc and setting the hight offset of the other side of the line, so its counteracting the trigOffset
    var heightOffset = LineHeightOffset - trigOffset;
    line.querySelector("line").setAttribute("y2", heightOffset);

    // Calcing and setting the new width the line should be
    var halfOfWidth = videoPos.getBoundingClientRect().width / 3;
    var halfOfMiddleWidth = posMiddle.getBoundingClientRect().width / 2;

    var totalWidth = (window.innerWidth * 0.34) - halfOfWidth - halfOfMiddleWidth;
    line.querySelector("line").setAttribute("x2", mult * totalWidth);
    
    // Setting the left offset of the origin of the line so that it is on the edge of the video
    line.style.transform = 'translateX(' + mult * halfOfWidth + 'px)';

    // VVVV - OLD CODE - VVVV
    
    // Calc and setting the rotation of the line to point towards the center
    // var length = Math.sqrt(heightOffset*heightOffset + totalWidth*totalWidth);
    // var deg = -1 * Number(videoPos.style.getPropertyValue('--trig-px').slice(0, -2)) / 10 * Math.acos(heightOffset / length);
    // line.style.transform = 'translateX(' + halfOfWidth + 'px) rotate(' + deg + 'deg)'; 

    // console.log(trigOffset)

    // Math.acos()
    // console.log(Math.acos(200 / totalWidth))
    // console.log(videoPos.style.getPropertyValue('--trig-px'))

    // Setting the length of the line to reach the middle 
}