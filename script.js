if ("scrollRestoration" in history) {
history.scrollRestoration = "manual";
}

window.addEventListener("DOMContentLoaded", function () {
if (window.location.hash) {
history.replaceState(null, "", window.location.pathname + window.location.search);
}

requestAnimationFrame(function () {
window.scrollTo(0, 0);
});
});

const form = document.querySelector(".waitlist-form");
const button = document.querySelector(".waitlist-form button");

if (form && button) {
form.addEventListener("submit", function () {
button.textContent = "Joining...";
button.disabled = true;
});
}
