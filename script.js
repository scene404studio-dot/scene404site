const form = document.querySelector(".waitlist");
const button = document.querySelector(".waitlist button");

if (form && button) {
form.addEventListener("submit", function () {
button.textContent = "Joining...";
button.disabled = true;
});
}
