const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

// TOGGLE MENU
toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("active");
});

// KLIK LINK → MENU TUTUP
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    toggle.classList.remove("active");
  });
});

// KLIK LUAR NAV → MENU TUTUP
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove("active");
    toggle.classList.remove("active");
  }
});
