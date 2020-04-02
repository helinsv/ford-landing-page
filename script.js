window.onload = function() {
    var loopNumber = -1;
    var loopCount = 1;
    var loopDuration = 9;

    var tl = new TimelineMax();
    var fr1 = 0;

    tl.set([".animated"], { opacity: 0, y: -10 }, 0);
    tl.staggerTo('.animated', 1.5, { opacity: 1, y: 0 }, 0.4);

    tl.set('.title p', { y: -10, opacity: 0 }, 0);
    tl.to('.title p', 0.5, { y: 0, opacity: 1 }, 1.6);

    //arrow
    tl.set([arrow_1, arrow_2, arrow_circle, arrow_text1, arrow_text2, arrow_text3], { opacity: 0, }, 0);
    tl.set([arrow_1, arrow_2], { scale: 0 }, 0);

    tl.to([arrow_1], 1, { rotation: 360, scale: 0.6, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 0.5);
    tl.to([arrow_2], 1, { rotation: 360, scale: 0.6, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 0.5);

    tl.to([arrow_circle], 1, { rotation: 360, scale: 0.6, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 1.8);

    tl.to([arrow_text1], 1, { opacity: 1, scale: 0.6, ease: Power2.easeOut }, fr1 + 1.3);
    tl.to([arrow_text2], 1, { opacity: 1, scale: 0.6, ease: Power2.easeOut }, fr1 + 1.5);
    tl.to([arrow_text3], 1, { opacity: 1, scale: 0.6, ease: Power2.easeOut }, fr1 + 1.7);

    // FIND
    tl.to('.find p', 1, { y: 0, opacity: 1, ease: Bounce.easeOut }, fr1 + 3.5);
    tl.set('#chevron', { right: -10 }, fr1);
    tl.to('#chevron', 1, { top: -12, opacity: 1 }, fr1 + 3.5);

    tl.set({}, { onComplete: resetMainTimeLine }, loopDuration);

    function resetMainTimeLine() {
        if (loopCount != loopNumber) {
            loopCount++;
            tl.restart();
        }
    }
}