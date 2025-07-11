// Mobile Optimization and Touch Gestures
class MobileOptimizer {
  constructor() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
    this.init();
  }

  init() {
    this.setupTouchGestures();
    this.setupMobileMenu();
    this.setupViewportOptimization();
    this.setupTouchFeedback();
  }

  setupTouchGestures() {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > this.minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.handleSwipeRight();
        } else {
          this.handleSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.handleSwipeDown();
        } else {
          this.handleSwipeUp();
        }
      }
    }
  }

  handleSwipeRight() {
    // Navigate to previous page or open menu
    if (window.location.pathname.includes('resume.html')) {
      window.location.href = '../index.html';
    } else if (window.location.pathname.includes('blog.html')) {
      window.location.href = 'resume.html';
    }
  }

  handleSwipeLeft() {
    // Navigate to next page
    if (window.location.pathname.includes('index.html')) {
      window.location.href = 'html/resume.html';
    } else if (window.location.pathname.includes('resume.html')) {
      window.location.href = 'blog.html';
    }
  }

  handleSwipeUp() {
    // Scroll to top or show navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSwipeDown() {
    // Scroll to bottom or hide navigation
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  setupMobileMenu() {
    const menuBtn = document.querySelector('.sidebar_btn');
    const menu = document.querySelector('.top-menu-nav');
    
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
          menu.classList.remove('active');
          menuBtn.classList.remove('active');
        }
      });
    }
  }

  setupViewportOptimization() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // Optimize for mobile performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preloadCriticalResources();
      });
    }
  }

  setupTouchFeedback() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .stat-card, .accordion-header');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
      });

      element.addEventListener('touchend', () => {
        element.style.transform = 'scale(1)';
      });
    });
  }

  preloadCriticalResources() {
    // Preload critical resources for better performance
    const criticalResources = [
      '../js/style.css',
      '../js/script.js',
      'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,700&display=swap'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  }
}

// Initialize mobile optimization
document.addEventListener('DOMContentLoaded', () => {
  new MobileOptimizer();
});

// Export for use in other scripts
window.MobileOptimizer = MobileOptimizer; 