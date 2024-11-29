const PORT = `http://127.0.0.1:5500/`;

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const closeButton = document.querySelector(".close-button");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("d-block");
});

closeButton.addEventListener("click", () => {
  navbar.classList.remove("d-block");
});

