const form = document.querySelector(".waitlist-form");
const button = form?.querySelector('button[type="submit"]');

if (form && button) {
const originalButtonText = button.textContent;

form.addEventListener("submit", function (event) {
if (!form.checkValidity()) {
return;
}

button.textContent = "Joining...";
button.disabled = true;
button.setAttribute("aria-busy", "true");
});

window.addEventListener("pageshow", function () {
button.textContent = originalButtonText;
button.disabled = false;
button.removeAttribute("aria-busy");
});
}
