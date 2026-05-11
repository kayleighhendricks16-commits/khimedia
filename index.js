// ========== PARALLAX EFFECTS ==========
const parallaxLayers = document.querySelectorAll('.parallax-layer');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  parallaxLayers.forEach((layer, index) => {
    const speed = 0.5 + (index * 0.2);
    const yPos = -(scrolled * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .step, .section-header, .faq-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible', 'revealed');
      
      // Add staggered animation for cards
      if (entry.target.classList.contains('service-card') || 
          entry.target.classList.contains('portfolio-card') || 
          entry.target.classList.contains('testimonial-card')) {
        const cards = entry.target.parentElement.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 100);
        });
      }
      
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px) scale(0.95)';
  el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  revealObserver.observe(el);
});

// ========== BUTTON INTERACTIONS ==========
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
  // Enhanced ripple effect
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  // Magnetic effect for buttons
  button.classList.add('magnetic');
});

// ========== THEME SYSTEM ==========
const themeToggles = document.querySelectorAll('#themeToggle, #mobileThemeToggle');
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  themeToggles.forEach(btn => btn.classList.add('dark'));
} else {
  root.setAttribute('data-theme', 'light');
  themeToggles.forEach(btn => btn.classList.remove('dark'));
}

// Theme toggle function
function toggleTheme() {
  if (root.getAttribute('data-theme') === 'light') {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggles.forEach(btn => btn.classList.add('dark'));
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggles.forEach(btn => btn.classList.remove('dark'));
  }
}

// Add click handlers to theme toggles
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', toggleTheme);
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== PERFORMANCE OPTIMIZATION ==========
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

function updateScrollEffects() {
  // Update scroll-based animations here
  ticking = false;
}

window.addEventListener('scroll', requestTick);

// ========== DYNAMIC BACKGROUND ==========
function updateBackgroundGradient() {
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = scrollPercent * 60; // 0 to 60 degrees
  
  document.documentElement.style.setProperty('--dynamic-hue', hue);
}

window.addEventListener('scroll', updateBackgroundGradient);

// ========== MOBILE MENU ==========
const mobileToggle = document.querySelector('.mobile-toggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

function openMenu() {
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Animate menu items
  const menuItems = menuOverlay.querySelectorAll('.mobile-nav-link, .mobile-cta');
  menuItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(50px)';
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 100 + 200);
  });
  
  if (mobileToggle) {
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, -6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  }
}

function closeMenu() {
  // Animate menu items out
  const menuItems = menuOverlay.querySelectorAll('.mobile-nav-link, .mobile-cta');
  menuItems.forEach((item, index) => {
    item.style.transform = 'translateX(50px)';
    item.style.opacity = '0';
  });
  
  setTimeout(() => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
  
  if (mobileToggle) {
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.transform = 'none';
    spans[2].style.transform = 'none';
  }
}

// Add event listeners
if (mobileToggle) {
  mobileToggle.addEventListener('click', openMenu);
}

if (menuCloseBtn) {
  menuCloseBtn.addEventListener('click', closeMenu);
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isActive = btn.classList.contains('active');
    
    // Close all other answers
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.classList.remove('active');
        other.nextElementSibling.style.maxHeight = null;
      }
    });
    
    if (!isActive) {
      btn.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      btn.classList.remove('active');
      answer.style.maxHeight = null;
    }
  });
});

// ========== FOOTER YEAR ==========
document.getElementById('currentYear').textContent = new Date().getFullYear();
