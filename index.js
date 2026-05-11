// ========== SIMPLIFIED INTERACTIVE EFFECTS ==========

// Parallax scrolling effect
const parallaxLayers = document.querySelectorAll('.parallax-layer');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  parallaxLayers.forEach((layer, index) => {
    const speed = 0.5 + (index * 0.2);
    const yPos = -(scrolled * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
});

// Enhanced scroll reveal with performance optimization
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

// Premium button interactions
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

// Enhanced theme toggle with sound effect simulation
const themeToggles = document.querySelectorAll('#themeToggle, #mobileThemeToggle');
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    // Add visual feedback
    toggle.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
      toggle.style.transform = '';
    }, 300);
  });
});

// Smooth scroll with easing
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

// Performance optimization: Throttle scroll events
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

// Dynamic gradient background based on scroll position
function updateBackgroundGradient() {
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = scrollPercent * 60; // 0 to 60 degrees
  
  document.documentElement.style.setProperty('--dynamic-hue', hue);
}

window.addEventListener('scroll', updateBackgroundGradient);

// ========== ORIGINAL CODE (enhanced) ==========
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  themeToggles.forEach(btn => btn.classList.add('dark'));
} else {
  root.setAttribute('data-theme', 'light');
  themeToggles.forEach(btn => btn.classList.remove('dark'));
}

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
themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));

// Footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile menu (slide from right)
const mobileToggle = document.querySelector('.mobile-toggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

// Enhanced mobile menu animations
function openMenu() {
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Animate menu items
  const menuItems = menuOverlay.querySelectorAll('.mobile-nav-link, .mobile-cta');
  menuItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(50px)';
    setTimeout(() => {
      item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 100 + 200);
  });
  
  if (mobileToggle) {
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
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
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuOverlay.classList.contains('active')) closeMenu();
    else openMenu();
  });
}
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay?.classList.contains('active')) closeMenu();
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isActive = btn.classList.contains('active');
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

// Enhanced scroll reveal with more elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible', 'revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll-triggered elements
document.addEventListener('DOMContentLoaded', () => {
  // Cards and steps
  document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .step').forEach(el => observer.observe(el));
  
  // Section headers
  document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
  
  // FAQ items
  document.querySelectorAll('.faq-item').forEach(el => observer.observe(el));
  
  // About section
  document.querySelectorAll('.about-grid > *').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
  
  // Process steps with stagger
  document.querySelectorAll('.step').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
  });
});

// Active page highlight
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Enhanced card tilt with better performance
if (window.innerWidth > 768) {
  document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    
    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.transform = '';
    });
    
    card.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '0';
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

// Button ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
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
});