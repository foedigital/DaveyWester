/* ==========================================
   MAIN.JS - Davey Wester Website
   Navigation, Cursor, Forms, and Interactions
   ========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCursor();
  initMobileMenu();
  initSwiper();
  initTilt();
  initForms();
  initFireflies();
  initSmoothScroll();
  initEasterEgg();
  initCounters();
});

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');

  if (!cursor || !cursorFollower) {
    console.log('Cursor elements not found');
    return;
  }

  // Check for touch/mobile devices
  const isTouchDevice = window.matchMedia('(hover: none)').matches ||
                        window.matchMedia('(pointer: coarse)').matches ||
                        'ontouchstart' in window;

  if (isTouchDevice) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;

  // Make cursor visible immediately
  cursor.style.opacity = '1';
  cursor.style.display = 'block';
  cursorFollower.style.opacity = '0.5';
  cursorFollower.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Slower follower movement
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  console.log('Cursor initialized');

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [data-cursor-text], .video-card, .tour-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('active');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Animate links with stagger
    if (mobileMenu.classList.contains('active')) {
      mobileLinks.forEach((link, index) => {
        link.style.transitionDelay = `${0.1 + index * 0.1}s`;
      });
    } else {
      mobileLinks.forEach(link => {
        link.style.transitionDelay = '0s';
      });
    }
  });

  // Close menu when clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================
   VIDEO SWIPER CAROUSEL
   ========================================== */
function initSwiper() {
  const swiperContainer = document.querySelector('.video-swiper');

  if (!swiperContainer) return;

  const videoSwiper = new Swiper('.video-swiper', {
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    },

    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev'
    },

    keyboard: {
      enabled: true
    },

    loop: true,
    speed: 600
  });

  // Re-initialize tilt after slide change
  videoSwiper.on('slideChange', () => {
    initTilt();
  });

  // Initialize video click to play
  initVideoClick();
}

/* ==========================================
   VIDEO CLICK TO PLAY
   ========================================== */
function initVideoClick() {
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      console.log('Video ID from data attribute:', videoId);
      console.log('Full iframe URL:', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      if (!videoId) return;

      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-overlay"></div>
        <div class="video-modal-content">
          <button class="video-modal-close">&times;</button>
          <div class="video-modal-iframe">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/${videoId}?autoplay=1"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Debug: Log the actual iframe src that was set
      const iframe = modal.querySelector('iframe');
      console.log('Actual iframe src:', iframe ? iframe.src : 'iframe not found');

      const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
      };

      modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
      modal.querySelector('.video-modal-overlay').addEventListener('click', closeModal);

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  });
}

/* ==========================================
   VANILLA TILT
   ========================================== */
function initTilt() {
  // Check if VanillaTilt is available
  if (typeof VanillaTilt === 'undefined') {
    console.warn('VanillaTilt not loaded');
    return;
  }

  // Only init on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 10,
    speed: 400,
    scale: 1.02,
    glare: true,
    'max-glare': 0.1
  });
}

/* ==========================================
   FORM HANDLING
   ========================================== */
function initForms() {
  // Newsletter/Mailing List Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterError = document.getElementById('newsletter-error');
  const newsletterBtn = document.getElementById('newsletter-btn');
  const nameInput = document.getElementById('newsletter-name');
  const emailInput = document.getElementById('newsletter-email');

  // Google Apps Script endpoint
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjntD5TvAEGBXWNG3aXm8jEjXyoLon8BcI_pTemxxkQykvLr4Ela-6DhaXix6h1bJv/exec';

  if (newsletterForm) {
    // Clear error styling on input
    [nameInput, emailInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          if (newsletterError) newsletterError.textContent = '';
        });
      }
    });

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous errors
      if (newsletterError) newsletterError.textContent = '';
      nameInput?.classList.remove('error');
      emailInput?.classList.remove('error');

      // Get form values
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';

      // Validate name
      if (!name) {
        if (nameInput) nameInput.classList.add('error');
        if (newsletterError) newsletterError.textContent = 'Please enter your name.';
        nameInput?.focus();
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (emailInput) emailInput.classList.add('error');
        if (newsletterError) newsletterError.textContent = 'Please enter a valid email address.';
        emailInput?.focus();
        return;
      }

      // Show loading state
      if (newsletterBtn) {
        newsletterBtn.classList.add('loading');
        newsletterBtn.disabled = true;
      }

      try {
        // Submit to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            name: name
          })
        });

        // With no-cors mode, we can't read the response
        // So we assume success if no error was thrown
        newsletterForm.style.display = 'none';
        if (newsletterSuccess) newsletterSuccess.classList.add('show');

      } catch (error) {
        console.error('Newsletter signup error:', error);
        if (newsletterError) {
          newsletterError.textContent = 'Something went wrong. Please try again later.';
        }
      } finally {
        // Reset loading state
        if (newsletterBtn) {
          newsletterBtn.classList.remove('loading');
          newsletterBtn.disabled = false;
        }
      }
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const button = contactForm.querySelector('button');
      const originalText = button.innerHTML;

      button.innerHTML = '<span>Sending...</span>';
      button.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        button.innerHTML = '<span>Message Sent!</span>';
        button.style.background = '#4a5c3a';

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
          button.style.background = '';
        }, 3000);
      }, 1500);
    });
  }
}

/* ==========================================
   FIREFLIES
   ========================================== */
function initFireflies() {
  const container = document.getElementById('fireflies');
  if (!container) return;

  // Only show fireflies on larger screens
  if (window.innerWidth < 768) return;

  const fireflyCount = 15;

  for (let i = 0; i < fireflyCount; i++) {
    createFirefly(container, i);
  }
}

function createFirefly(container, index) {
  const firefly = document.createElement('div');
  firefly.className = 'firefly';

  // Random starting position
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  // Random movement values
  const xEnd = (Math.random() - 0.5) * 200;
  const yEnd = (Math.random() - 0.5) * 200;
  const xFinal = xEnd + (Math.random() - 0.5) * 100;
  const yFinal = yEnd - 100;

  firefly.style.cssText = `
    left: ${startX}%;
    top: ${startY}%;
    --x-end: ${xEnd}px;
    --y-end: ${yEnd}px;
    --x-final: ${xFinal}px;
    --y-final: ${yFinal}px;
    animation: fireflyFloat ${8 + Math.random() * 6}s ease-in-out infinite;
    animation-delay: ${Math.random() * 8}s;
  `;

  container.appendChild(firefly);
}

/* ==========================================
   SMOOTH SCROLL (LENIS)
   ========================================== */
function initSmoothScroll() {
  // Check if Lenis is available
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false
  });

  // Update ScrollTrigger on scroll
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // Animation loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Make lenis globally available
  window.lenis = lenis;
}

/* ==========================================
   EASTER EGG (KONAMI CODE)
   ========================================== */
function initEasterEgg() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function activateEasterEgg() {
  const easterEgg = document.getElementById('easter-egg');
  if (easterEgg) {
    easterEgg.classList.add('active');

    // Play a sound if you want
    // const audio = new Audio('assets/sounds/secret.mp3');
    // audio.play();
  }
}

/* ==========================================
   ANIMATED COUNTERS
   ========================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    const current = Math.floor(start + (target - start) * easeOutQuart);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================
   MAGNETIC BUTTONS
   ========================================== */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* ==========================================
   VIDEO CARD CLICK HANDLING
   ========================================== */
// Video card click handling is now done via initVideoClick() in initSwiper()

/* ==========================================
   PARALLAX EFFECT ON HERO
   ========================================== */
// Parallax is now handled by GSAP in animations.js

/* ==========================================
   HANDLE RESIZE
   ========================================== */
let mainResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(mainResizeTimer);
  mainResizeTimer = setTimeout(() => {
    // Reinitialize components that need resize handling
    if (window.innerWidth >= 768) {
      initFireflies();
    }
  }, 250);
});

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */
// Lazy load images
document.querySelectorAll('img[data-src]').forEach(img => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  observer.observe(img);
});

// Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
