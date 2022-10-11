const adaptiveMenu = document.querySelector(".menu--adaptive");
const gamburger = document.querySelector(".gamburger");
const close = document.querySelector(".close");

gamburger.addEventListener("click", e => {
    adaptiveMenu.style.display = "block";
})

close.addEventListener("click", e => {
    adaptiveMenu.style.display = "none";
})