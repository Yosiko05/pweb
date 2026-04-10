// ===== KAI Commuter - Simple DOM Script =====

// 1. NAVBAR - Tambah class 'scrolled' saat halaman di-scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. NAVBAR - Highlight menu aktif saat diklik
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// 3. HERO - Animasi teks muncul saat halaman dimuat
const heroContent = document.querySelector('.hero-content');

window.addEventListener('load', () => {
  heroContent.classList.add('visible');
});

// 4. TOMBOL READ MORE - Tampilkan alert sederhana
const readMoreBtn = document.querySelector('.btn');

readMoreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Selamat datang di KAI Commuter!\nNikmati perjalanan yang mudah dan nyaman.');
});

// 5. TOMBOL GOOGLE PLAY - Konfirmasi sebelum menuju toko
const googlePlayBtn = document.querySelector('.google-play-btn');

googlePlayBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const konfirmasi = confirm('Anda akan diarahkan ke Google Play Store.\nLanjutkan?');
  if (konfirmasi) {
    window.open('https://play.google.com/store', '_blank');
  }
});

// 6. NOTIFIKASI - Tampilkan pesan sambutan kecil di pojok layar
function tampilkanNotifikasi(pesan) {
  const notif = document.createElement('div');
  notif.textContent = pesan;
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1a2a6c;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    transition: opacity 0.5s;
  `;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.remove(), 500);
  }, 3000);
}

// ===== C-CORNER SLIDER =====
// ===== C-CORNER INFINITE CAROUSEL =====
const track = document.getElementById('ccornerTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let cards = document.querySelectorAll('.product-card');
let visibleCards = 4;
let currentIndex = visibleCards;

// RESPONSIVE
function updateVisibleCards() {
  if (window.innerWidth <= 768) {
    visibleCards = 1;
  } else if (window.innerWidth <= 1024) {
    visibleCards = 2;
  } else {
    visibleCards = 4;
  }
}
updateVisibleCards();
window.addEventListener("resize", updateVisibleCards);

// ===== CLONE UNTUK INFINITE =====
function setupInfiniteCarousel() {
  const cardArray = Array.from(cards);

  const firstClones = cardArray.slice(0, visibleCards);
  const lastClones = cardArray.slice(-visibleCards);

  firstClones.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  lastClones.reverse().forEach(card => {
    const clone = card.cloneNode(true);
    track.insertBefore(clone, track.firstChild);
  });

  cards = document.querySelectorAll('.product-card');
}

setupInfiniteCarousel();

// ===== UPDATE POSISI =====
function updateSlider(animate = true) {
  const cardWidth = cards[0].offsetWidth + 20;

  if (!animate) track.style.transition = "none";
  else track.style.transition = "transform 0.5s ease";

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// posisi awal (setelah clone)
window.addEventListener("load", () => {
  updateSlider(false);
});

// ===== NEXT =====
nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

// ===== PREV =====
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

// ===== LOOP RESET =====
track.addEventListener('transitionend', () => {
  const total = cards.length;

  if (currentIndex >= total - visibleCards) {
    currentIndex = visibleCards;
    updateSlider(false);
  }

  if (currentIndex <= 0) {
    currentIndex = total - (visibleCards * 2);
    updateSlider(false);
  }
});

// ===== AUTO SLIDE (OPSIONAL) =====
let autoSlide = setInterval(() => {
  currentIndex++;
  updateSlider();
}, 3000);

// pause kalau hover
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex++;
    updateSlider();
  }, 3000);
});

// ===== NOTIFIKASI TOAST =====
function tampilkanNotifikasi(pesan) {
  const notif = document.createElement('div');
  notif.textContent = pesan;
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1a2a6c;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    transition: opacity 0.5s;
  `;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.remove(), 500);
  }, 3000);
}

window.addEventListener('load', () => {
  tampilkanNotifikasi('Selamat datang di KAI Commuter!');
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const closeBtn = document.getElementById('closeBtn');

// buka menu
hamburger.addEventListener('click', () => {
  navMenu.classList.add('active');
});

// tutup menu
closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

