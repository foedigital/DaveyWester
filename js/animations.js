/* ==========================================
   ANIMATIONS.JS - GSAP & ScrollTrigger
   Davey Wester Website
   ========================================== */

// Wait for GSAP to be ready
document.addEventListener('DOMContentLoaded', () => {
  // DISABLED: js-loaded class was hiding content
  // document.body.classList.add('js-loaded');

  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - showing content without animation');
    initAOS();
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize all animations
  initPreloader();
});

/* ==========================================
   PRELOADER ANIMATION
   ========================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderText = document.querySelector('.preloader-text');
  const preloaderBar = document.querySelector('.preloader-bar');
  const preloaderTagline = document.querySelector('.preloader-tagline');

  // Safety timeout - force hide preloader after 4 seconds no matter what
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      console.log('Preloader timeout - forcing hide');
      preloader.style.display = 'none';
      preloader.classList.add('hidden');
      initScrollAnimations();
      initAOS();
    }
  }, 4000);

  if (!preloader) {
    // No preloader, start animations immediately
    animateHero();
    initScrollAnimations();
    return;
  }

  // Preloader timeline
  const preloaderTL = gsap.timeline();

  preloaderTL
    // Fade in preloader elements
    .to(preloaderText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    .to(preloaderBar, {
      opacity: 1,
      duration: 0.4
    }, '-=0.2')
    .to(preloaderTagline, {
      opacity: 1,
      duration: 0.4
    }, '-=0.2')
    // Animate progress bar
    .to(preloaderFill, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    // Slide out preloader
    .to(preloader, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        preloader.classList.add('hidden');
        animateHero();
        initScrollAnimations();
        initAOS();
      }
    }, '+=0.2');
}

/* ==========================================
   HERO ANIMATION
   ========================================== */
function animateHero() {
  const heroTL = gsap.timeline();

  heroTL
    // Tag line
    .to('.hero-tag', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    // Title reveal (staggered lines)
    .to('.hero-title .line-inner', {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    }, '-=0.4')
    // Tagline
    .to('.hero-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    // Subtitle
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    // CTA buttons
    .to('.hero-ctas', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    // Scroll indicator
    .to('#scroll-indicator', {
      opacity: 1,
      duration: 0.8
    }, '-=0.2');
}

/* ==========================================
   SCROLL-TRIGGERED ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  // Check if ScrollTrigger is available
  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger not loaded');
    return;
  }

  // Progress bar
  gsap.to('#progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // Fade out scroll indicator
  gsap.to('#scroll-indicator', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=300',
      scrub: true
    }
  });

  // Hero parallax - updated for new hero layout
  gsap.to('.hero-photo', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // DISABLED: gsap.from() animations were causing content to be hidden
  // Content visibility is now handled by CSS and AOS
  // The gsap.from() calls set initial opacity:0 which hides content
  // until ScrollTrigger fires. This was unreliable.

  console.log('Scroll animations initialized (parallax only)');
}

/* ==========================================
   AOS (Animate On Scroll) INITIALIZATION
   ========================================== */
function initAOS() {
  // Check if AOS is available
  if (typeof AOS === 'undefined') {
    console.warn('AOS not loaded');
    return;
  }

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    disable: 'mobile'
  });
}

/* ==========================================
   TEXT SPLIT ANIMATION (Alternative to SplitText)
   ========================================== */
function splitText(element) {
  const text = element.textContent;
  element.innerHTML = '';

  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    element.appendChild(span);
  });

  return element.querySelectorAll('span');
}

function animateSplitText(chars, options = {}) {
  const defaults = {
    duration: 0.05,
    stagger: 0.02,
    ease: 'power3.out'
  };

  const settings = { ...defaults, ...options };

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: settings.duration,
    stagger: settings.stagger,
    ease: settings.ease
  });
}

/* ==========================================
   MAGNETIC ELEMENT ANIMATION
   ========================================== */
function initMagneticElements() {
  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

/* ==========================================
   REVEAL ANIMATION HELPERS
   ========================================== */
const RevealAnimations = {
  fadeUp: (element, delay = 0) => {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    });
  },

  fadeDown: (element, delay = 0) => {
    gsap.from(element, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    });
  },

  fadeLeft: (element, delay = 0) => {
    gsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    });
  },

  fadeRight: (element, delay = 0) => {
    gsap.from(element, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    });
  },

  scaleIn: (element, delay = 0) => {
    gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    });
  },

  staggerFadeUp: (elements, stagger = 0.1) => {
    gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out'
    });
  }
};

/* ==========================================
   HOVER ANIMATIONS
   ========================================== */
function initHoverAnimations() {
  // Button hover glow
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        boxShadow: '0 0 40px rgba(232, 93, 4, 0.5)',
        duration: 0.3
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        boxShadow: '0 0 0 rgba(232, 93, 4, 0)',
        duration: 0.3
      });
    });
  });

  // Card hover lift
  document.querySelectorAll('.tour-card, .video-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

/* ==========================================
   SCROLL VELOCITY EFFECT
   ========================================== */
function initScrollVelocity() {
  let currentScroll = 0;
  let targetScroll = 0;
  let scrollVelocity = 0;

  const marquee = document.querySelector('.marquee-content');
  if (!marquee) return;

  let baseSpeed = -30; // Base animation speed (matches CSS)

  window.addEventListener('scroll', () => {
    targetScroll = window.pageYOffset;
    scrollVelocity = targetScroll - currentScroll;
    currentScroll = targetScroll;

    // Adjust marquee speed based on scroll velocity
    const speedMultiplier = 1 + Math.abs(scrollVelocity) * 0.01;
    marquee.style.animationDuration = `${30 / speedMultiplier}s`;
  });
}

/* ==========================================
   INITIALIZE ON LOAD
   ========================================== */
window.addEventListener('load', () => {
  initMagneticElements();
  initHoverAnimations();
  // DISABLED: initScrollVelocity was causing marquee to stutter on scroll
  // initScrollVelocity();

  // Update ScrollTrigger when images load
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

/* ==========================================
   REFRESH ON RESIZE
   ========================================== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 250);
});

/* ==========================================
   EXPORT FOR USE IN OTHER SCRIPTS
   ========================================== */
window.RevealAnimations = RevealAnimations;
