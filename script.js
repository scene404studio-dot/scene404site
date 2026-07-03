/* =========================================================
BRB Website
script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* ==========================================
Reveal animation
========================================== */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {
entry.target.classList.add("visible");
}

});

},
{
threshold: 0.15
}
);

reveals.forEach(section => observer.observe(section));



/* ==========================================
Smooth Navigation
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function (e) {

const target = document.querySelector(this.getAttribute("href"));

if (!target) return;

e.preventDefault();

target.scrollIntoView({
behavior: "smooth",
block: "start"
});

});

});



/* ==========================================
Waitlist Form
========================================== */

const form = document.querySelector(".waitlist-form");

if (form) {

form.addEventListener("submit", function (e) {

e.preventDefault();

const email = form.querySelector("input").value.trim();

if (!email) return;

alert("Thanks for joining the BRB waitlist ✨");

form.reset();

});

}



/* ==========================================
Hero Fade
========================================== */

const hero = document.querySelector(".hero-image");

if (hero) {

window.addEventListener("scroll", () => {

const scroll = window.scrollY;

hero.style.opacity = 1 - scroll / 900;

});

}



/* ==========================================
Header Shadow
========================================== */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

if (window.scrollY > 30) {

header.style.boxShadow =
"0 8px 30px rgba(0,0,0,.04)";

} else {

header.style.boxShadow = "none";

}

});

});



/* ================================================
Small Floating Animation
================================================ */

const floatingImages = document.querySelectorAll(".full-image");

floatingImages.forEach((image, index) => {

image.animate(
[

{
transform: "translateY(0px)"
},

{
transform: "translateY(-8px)"
},

{
transform: "translateY(0px)"
}

],

{

duration: 7000 + index * 1200,

iterations: Infinity,

easing: "ease-in-out"

}

);

});



/* ================================================
Page Fade In
================================================ */

window.onload = () => {

document.body.animate(

[

{
opacity: 0
},

{
opacity: 1
}

],

{

duration: 700,

fill: "forwards"

}

);

};



/* ================================================
Console Signature
================================================ */

console.log(
"%cBRB — A tiny world. Always up to something.",
"font-size:16px;font-weight:600;color:#111;"
);