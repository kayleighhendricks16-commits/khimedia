// index.js – Clean, smooth interactions, no stat counters, improved animations

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');

  const updateLogo = (img) => {
    if (!img) return;
    const light = img.getAttribute('data-light') || img.src;
    const dark = img.getAttribute('data-dark') || light;
    img.src = isDark ? dark : light;
  };
  document.querySelectorAll('img[data-light][data-dark]').forEach(updateLogo);
}

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

const hamburger = document.getElementById('hamburgerBtn');
const slideMenu = document.getElementById('slideMenu');
const closeBtn = document.getElementById('slideCloseBtn');
let menuOpen = false;

function openMenu() {
  slideMenu.classList.add('active');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
  menuOpen = true;
}
function closeMenu() {
  slideMenu.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
  menuOpen = false;
}

if (hamburger && slideMenu) {
  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.querySelectorAll('.slide-link, .slide-cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) closeMenu();
});

document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href) return;

    const url = new URL(href, window.location.href);
    const isSamePage = url.pathname === window.location.pathname;
    const hash = url.hash.slice(1);
    if (!isSamePage || !hash) return;

    const target = document.getElementById(hash);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      history.pushState(null, null, url.hash);
      if (menuOpen) closeMenu();
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -52px 0px' });

  revealElements.forEach((el) => {
    const siblings = Array.from(el.parentElement?.children || []).filter((child) => child.classList.contains('reveal'));
    const localIndex = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--reveal-delay', `${Math.min(localIndex, 3) * 55}ms`);
    observer.observe(el);
  });
}

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(active => {
      if (active !== item) active.classList.remove('active');
    });
    if (!isActive) item.classList.add('active');
    else item.classList.remove('active');
  });
});

const sections = document.querySelectorAll('section[id]');
const allNavLinks = [...document.querySelectorAll('.nav-link'), ...document.querySelectorAll('.slide-link')];

function updateActiveLink() {
  if (document.querySelector('.nav-link.page-active, .slide-link.page-active')) return;

  let current = '';
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active-nav');
    const href = link.getAttribute('href');
    if (href && (href === `#${current}` || href === `index.html#${current}` || (current === '' && href === 'index.html'))) {
      link.classList.add('active-nav');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
