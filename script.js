var bannerWidth = 950;
var bannerHeight = 323;
var loopDuration = 7;
var pauseLastLoopAfter = 9;
var loopNumber = 5;

var enableTerms = false;
var ctaSolid = false;

var images = ["bg.jpg",
    "arrow_1.png", "arrow_2.png", "arrow_circle.png",
    "arrow_text1.png", "arrow_text2.png", "arrow_text3.png",
    "text1.png", "text2.png", "text3.png",
    "cta_bg.png", "find_out.png"
];

var fr1 = 0;

var tl_Frame = [];

tl_Frame[1] = function() {
    var tl = new TimelineMax();

    // start parameters
    tl.set([cta_bg, text1, text2, text3, find_out], { opacity: 0 }, 0);
    tl.set(find_out, { y: -25 }, 0);

    var copyTransitionTime = 1;

    // TEXT
    tl.to(text1, 0.8, { opacity: 1, ease: Circ.easeOut }, fr1 + 0.1);
    tl.to(text2, 0.5, { opacity: 1, ease: Circ.easeOut, opacity: 1 }, fr1 + 0.3);
    tl.to(text3, 0.8, { opacity: 1, ease: Circ.easeOut }, fr1 + 0.5);

    //arrow
    tl.set([arrow_1, arrow_2, arrow_circle, arrow_text1, arrow_text2, arrow_text3], { opacity: 0, x: 550 }, 0);
    tl.set([arrow_1, arrow_2], { scale: 0 }, 0);

    tl.to([arrow_1], 1, { rotation: 360, scale: 1, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 0.5);
    tl.to([arrow_2], 1, { rotation: 360, scale: 1, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 0.5);

    tl.to([arrow_circle], 1, { rotation: 360, scale: 1, transformOrigin: "center", ease: Power4.easeOut, opacity: 1 }, fr1 + 1.8);

    tl.to([arrow_text1], 1, { opacity: 1, scale: 1, ease: Power2.easeOut }, fr1 + 1.3);
    tl.to([arrow_text2], 1, { opacity: 1, scale: 1, ease: Power2.easeOut }, fr1 + 1.5);
    tl.to([arrow_text3], 1, { opacity: 1, scale: 1, ease: Power2.easeOut }, fr1 + 1.7);

    // FIND

    tl.to(find_out, 1, { y: 0, opacity: 1, ease: Bounce.easeOut }, fr1 + 3.5);

    tl.set([cta_bg, chevron], { x: 910 }, fr1); // cta position fix, must be between stripes
    tl.to([cta_bg], 1, { y: 15, opacity: 0.3 }, fr1 + 3.5);
    tl.to([chevron], 1, { y: 15, opacity: 1 }, fr1 + 3.5);


    return tl;
}

function clicktag_Click(e) {
    window.open(clickTag, "_blank");
}


function mouseEnter() {
    TweenMax.to(chevron, 0.5, { backgroundPosition: "20px", ease: Power2.easeInOut });
    // animationsPause(); 
}


function mouseLeave() {
    TweenMax.set(chevron, { backgroundPosition: "0px" });
}


function termsEnter() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";

    animationsPause();
}


function termsLeave() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    if (!stopAnimations) {
        animationsPlay();
    }
}



// ============================== Do not edit ============================== //
var mTL, content, loopCount = 1,
    stopAnimations = false,
    ctaStop = false;

// --- preloading images
if (!preloadImages) var preloadImages = [];

// ---------- (05) - main animation ---------- //

function startMainTimeLine() {
    for (var i = 1; i < tl_Frame.length; i++) {
        mTL.add(tl_Frame[i]());
    }

    mTL.set({}, { onComplete: pauseMainTimeLine }, pauseLastLoopAfter);
    mTL.set({}, { onComplete: resetMainTimeLine }, loopDuration);
}


function pauseMainTimeLine() {
    if (loopCount == loopNumber) {
        console.log("animation stop");
        stopAnimations = true;
        animationsPause();
    }
}

function resetMainTimeLine() {
    if (loopCount != loopNumber) {
        loopCount++;
        mTL.restart();
    }
}

function animationsPause() {
    mTL.pause();
}

function animationsPlay() {
    mTL.play();
}



// ---------- (04) - init ---------- //

function init() {
    content = document.getElementById("content");

    TweenMax.set([content, main, clicktag], { width: bannerWidth, height: bannerHeight });
    TweenMax.set(border, { width: bannerWidth - 2, height: bannerHeight - 2 });

    mTL = new TimelineMax();

    startMainTimeLine();
}



// ---------- (03) - images/styles load ---------- //
function initStage() {
    init();
}

function loadStyles() {
    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = initStage;
    extCSS.onload = initStage; // callback
}

function preLoadImages() {
    // preload images inside array preloadImages
    var newImages = [],
        l = preloadImages.length;
    for (var i = 0; i < preloadImages.length; i++) {
        newImages[i] = new Image();
        newImages[i].src = preloadImages[i];
        newImages[i].onerror = function() { l-- }
        newImages[i].onload = function() {
            if (!--l) {
                loadStyles(); // <- callback
            }
        }
    }
    if (!l) loadStyles(); // <- callback if array empty
}



// ---------- (02) - DC/ST/polite load ---------- //
function preloadingStage() {
    createImages(loadStyles);
}

function stLoad() {
    console.log("ready-Standalone");

    preloadingStage();
}

// ---------- (01) - first stage ---------- //
window.onload = function start() {
    if (typeof TimelineMax !== 'undefined') {
        stLoad();
    } else {
        console.log("TimelineMax is not defined, trying to reload");
        setTimeout(function() {
            start();
        }, 200);
    }
}

// ---------- createImages min - v1.0 ---------- //
function createImages(e, t) {
    function i(e, t) {
        t = document.getElementById(t);
        if (y) {
            var i = document.createElement("div");
            i.setAttribute("id", e.id + "_wrap"), i.appendChild(e), t.appendChild(i)
        } else t.appendChild(e)
    }

    function n(e) {
        e = document.getElementById(e);
        var t = document.createElement(h);
        if (t.setAttribute("id", f), A && t.setAttribute("class", A), y) {
            var i = document.createElement("div");
            i.setAttribute("id", f + "_wrap"), i.appendChild(t), e.appendChild(i)
        } else e.appendChild(t)
    }

    function a(e, t) { return e.reduce(function(e, i) { return e || (e = ""), e + (t.test(i) ? " " + /\w+/.exec(i)[0] : "") }, 0) }

    function s(e, t, i) {
        if (/\d/.test(t)) { first = /\d/.exec(t)[0], other = /\d+/.exec(t)[0].substring(1); var n = other ? first + "." + other : first } else n = 2;
        document.getElementById(e).style.width = i / n + "px"
    }

    function l(e) {
        w = !0;
        var t = m[0].split(/\/(?=[^\/]+$)/);
        f = t[1], u = e
    }

    function r() {
        var e = /(?=[^\|]+$).*/.exec(m[1])[0];
        e = e.match(/(\.\w+)|(\#\w+)|(\-\w+)/g), /\#\w+/.test(e) && (f = a(e, /\#/), f = /\w+/.exec(f)[0]), /\.\w+/.test(e) && function(e) { A = a(e, /\./), g && (p = (p += A).replace(/^\s/, "")), A = A.replace(/^\s/, "") }(e), /\-wrapper/.test(e) && (y = !0), /\-retina/.test(e) ? v = /\-retina\d*/.exec(e)[0] : /\-r/.test(e) && (v = /\-r\d*/.exec(e)[0]), u = w ? m[0] + "." + h : imgFolder + m[0] + "." + h
    }

    function d(e, t, a, d) {
        p = t;
        var c = e.length;
        if (c)
            for (var C = 0, x = c; C < x; C++) {
                if (m = e[C].split(/\.(.*)/), g = !!/^(jpg|png)/.test(m[1]), h = /^\w+/.exec(m[1])[0], /\//.test(m[0]) ? l(e[C]) : (f = m[0], u = d + e[C]), /\|/.test(m[1]) && r(), g) {
                    var E = new Image;
                    E.src = u, E.id = f, E.className = p, E.retinaSet = v, E.ii = e[C], i(E, a), E.onerror = function() { console.warn("input: " + this.ii + "\nid: " + this.id + " -> image with that id not found"), document.getElementById(this.id).style.display = "none", --c || o() }, E.onload = function() { this.retinaSet && s(this.id, this.retinaSet, this.width), --c || o() }
                } else n(a), --c || o();
                A = !1, w = !1, v = !1, y = !1
            } else o()
    }

    function o() { c && --c || t() }
    var c;
    arguments.length < 2 && (t = arguments[0]);
    var m, g, u, f, p, h, A = !1,
        w = !1,
        v = !1,
        y = !1;
    ! function(e) { "undefined" == typeof imgFolder && (imgFolder = "images/"), "undefined" != typeof images && Array.isArray(images) && (imagesAll = [], imagesAllClass = [], imagesAllParent = [], imagesAll[0] = images); for (var t = 0, i = c = imagesAll.length; t < i; t++) imagesAllClass[t] || (imagesAllClass[t] = "image"), imagesAllParent[t] || (imagesAllParent[t] = "main"), t && e && (imgFolder = ""), d(imagesAll[t], imagesAllClass[t], imagesAllParent[t], imgFolder) }(e)
}


// window.onload = function() {
//     var a1 = ".animated",
//         a4 = "header h1",
//         a5 = ".animated-2",
//         a6 = "header p";

//     tl = new TimelineMax();

//     tl.set([".animated"], {
//         opacity: 0
//     }, 0);
//     tl.staggerTo(a1, 1.5, {
//         opacity: 1
//     }, 0.4);

//     tl.set([a4, a5], {
//         opacity: 0,
//         x: 0,
//         y: -50,
//     }, 0);

//     tl.to([a4], 0.5, {
//         opacity: 1,
//         // ease: Bounce.easeOut,
//         ease: Power2.easeOut,
//         yoyo: true,
//         y: 0,
//         x: 0
//     }, 1.2);
//     tl.to([a5], 0.5, {
//         opacity: 1,
//         // ease: Bounce.easeOut,
//         ease: Power2.easeOut,
//         y: 0,
//         x: 0
//     }, 1.4);

//     tl.set(a6, {
//         x: -100,
//         opacity: 0
//     }, 0);
//     tl.to(a6, 1.5, {
//         x: 0,
//         opacity: 1
//     }, 1.8);

//}