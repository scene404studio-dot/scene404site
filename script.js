const form = document.querySelector(".waitlist-form");
const button = document.querySelector(".waitlist-form button");

if (form && button) {
form.addEventListener("submit", function () {
button.textContent = "Joining...";
button.disabled = true;
});
}
