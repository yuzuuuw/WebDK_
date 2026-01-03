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

function toggleForm(el) {
  const currentCard = el.closest('.contact-card');
  const currentForm = currentCard.querySelector('.contact-form');

  // Tutup semua form lain
  document.querySelectorAll('.contact-card').forEach(card => {
    const form = card.querySelector('.contact-form');
    const toggle = card.querySelector('.contact-toggle');

    if (form !== currentForm) {
      form.classList.remove('active');
      toggle.textContent = 'Hubungi Saya';
    }
  });

  // Toggle form yang diklik
  if (currentForm.classList.contains('active')) {
    currentForm.classList.remove('active');
    el.textContent = 'Hubungi Saya';
  } else {
    currentForm.classList.add('active');
    el.textContent = 'Tutup Form';
  }
}

