/* HEADER SCROLL EFFECT */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


/* PROJECT SWITCH */
const buttons = document.querySelectorAll('.project-btn');
const groups = document.querySelectorAll('.project-group');


buttons.forEach(btn => {
  btn.addEventListener('click', () => {

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;

    groups.forEach(group => {
      group.classList.remove('active');
      group.style.display = 'none';   // 🔥 PENTING
    });

    const selectedGroup = document.getElementById(target);
    if (!selectedGroup) return;

    selectedGroup.style.display = 'grid'; // 🔥 PENTING
    requestAnimationFrame(() => {
      selectedGroup.classList.add('active');
    });

    const cards = selectedGroup.querySelectorAll(".project-card");
    cards.forEach((card, index) => {
      card.classList.remove('show');
      setTimeout(() => {
        card.classList.add('show');
      }, index * 120);
    });

    attachPopupEvents(target);
  });
});



/* POPUP LOGIC */
let currentIndex = 0;
let currentList = [];
let isIframeMode = false;


const overlay = document.getElementById("popupOverlay");
const frame   = document.getElementById("popupFrame");
const popupImg = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");


function showItem(index) {
  if (isIframeMode) {
    popupImg.style.display = "none";
    frame.style.display = "block";
    frame.src = currentList[index];
  } else {
    frame.style.display = "none";
    popupImg.style.display = "block";
    popupImg.src = currentList[index];
  }
}

function attachPopupEvents(target) {
  const cards = document.querySelectorAll(`#${target} .project-card`);

  currentList = [];

  cards.forEach(card => {
    let link = card.getAttribute("data-link");
    if (link) {
      currentList.push(link);
    } else {
      currentList.push(card.querySelector("img").src);
    }
  });

  cards.forEach((card, index) => {
    card.onclick = () => {
      overlay.classList.add("show");
      currentIndex = index;

      if (card.getAttribute("data-link")) {
        isIframeMode = true;
      } else {
        isIframeMode = false;
      }

      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";

      showItem(currentIndex);
    };
  });
}



/* INITIAL LOAD BAGIAN PERTAMA */
window.addEventListener("DOMContentLoaded", () => {
  const firstActive = document.querySelector(".project-group.active");
  attachPopupEvents(firstActive.id);
});



/* NEXT PREV */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentList.length;
  showItem(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  showItem(currentIndex);
};


/* CLOSE */
closeBtn.onclick = () => {
  overlay.classList.remove("show");
  frame.src = "";
  popupImg.src = "";
};

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

