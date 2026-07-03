const form = document.querySelector(".waitlist-form");
const button = form?.querySelector("button");

if (form && button) {
form.addEventListener("submit", () => {
button.textContent = "Joining...";
button.disabled = true;
});
}
