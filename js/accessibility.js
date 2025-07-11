// Accessibility Features
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupFocusIndicators();
    this.setupSkipLinks();
  }

  setupKeyboardNavigation() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Tab navigation
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }

      // Escape key to close modals/menus
      if (e.key === 'Escape') {
        this.closeAllModals();
      }

      // Enter/Space for interactive elements
      if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('accordion-header')) {
          e.preventDefault();
          activeElement.click();
        }
      }
    });

    // Remove keyboard navigation class when mouse is used
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupScreenReaderSupport() {
    // Add ARIA labels and roles
    // Accordion başlıklarını button'a çevirmeden sadece ARIA ekle
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header, index) => {
      header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', `accordion-content-${index}`);
      header.id = `accordion-header-${index}`;
      const content = header.nextElementSibling;
      if (content) {
        content.setAttribute('id', `accordion-content-${index}`);
        content.setAttribute('aria-labelledby', `accordion-header-${index}`);
        content.setAttribute('role', 'region');
      }
    });
    // Add skip links
    this.addSkipLinks();
  }

  setupFocusIndicators() {
    // Add focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 3px solid #ff2222 !important;
        outline-offset: 2px !important;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #ff2222;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  setupSkipLinks() {
    // Add skip links for screen readers
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' }
    ];

    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      document.body.insertBefore(skipLink, document.body.firstChild);
    });
  }



  closeAllModals() {
    // Close any open modals or menus
    const openMenus = document.querySelectorAll('.top-menu-nav.active');
    openMenus.forEach(menu => menu.classList.remove('active'));
    
    const openAccordions = document.querySelectorAll('.accordion-item.active');
    openAccordions.forEach(accordion => accordion.classList.remove('active'));
  }

  addSkipLinks() {
    // Add main content and navigation IDs
    const mainContent = document.querySelector('.started-content');
    if (mainContent) {
      mainContent.id = 'main-content';
    }
    
    const navigation = document.querySelector('.top-menu-nav');
    if (navigation) {
      navigation.id = 'navigation';
    }
  }


}

// Initialize accessibility features
let accessibilityManager;
document.addEventListener('DOMContentLoaded', () => {
  accessibilityManager = new AccessibilityManager();
});

// Export for global access
window.accessibilityManager = accessibilityManager; 