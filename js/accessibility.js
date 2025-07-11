// Accessibility Features
class AccessibilityManager {
  constructor() {
    this.isHighContrast = false;
    this.fontSize = 100; // percentage
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupHighContrastMode();
    this.setupFontSizeControl();
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
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header, index) => {
      const content = header.nextElementSibling;
      const button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `accordion-content-${index}`);
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      
      // Move header content to button
      button.innerHTML = header.innerHTML;
      header.innerHTML = '';
      header.appendChild(button);
      
      if (content) {
        content.setAttribute('id', `accordion-content-${index}`);
        content.setAttribute('aria-labelledby', `accordion-header-${index}`);
        content.setAttribute('role', 'region');
      }
    });

    // Add skip links
    this.addSkipLinks();
  }

  setupHighContrastMode() {
    // Create high contrast toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.innerHTML = '🌙';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    contrastToggle.setAttribute('title', 'High Contrast Mode');
    contrastToggle.className = 'accessibility-toggle contrast-toggle';
    contrastToggle.addEventListener('click', () => this.toggleHighContrast());
    
    document.body.appendChild(contrastToggle);
  }

  setupFontSizeControl() {
    // Create font size controls
    const fontSizeControls = document.createElement('div');
    fontSizeControls.className = 'font-size-controls';
    fontSizeControls.innerHTML = `
      <button class="accessibility-toggle" aria-label="Decrease font size" onclick="accessibilityManager.changeFontSize(-10)">A-</button>
      <button class="accessibility-toggle" aria-label="Increase font size" onclick="accessibilityManager.changeFontSize(10)">A+</button>
    `;
    
    document.body.appendChild(fontSizeControls);
  }

  setupFocusIndicators() {
    // Add focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 3px solid #ff2222 !important;
        outline-offset: 2px !important;
      }
      
      .accessibility-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(24,24,27,0.9);
        border: 2px solid #ff2222;
        color: #fff;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      
      .accessibility-toggle:hover {
        background: #ff2222;
        transform: scale(1.1);
      }
      
      .font-size-controls {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .font-size-controls .accessibility-toggle {
        position: static;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
      
      .high-contrast {
        filter: contrast(150%) brightness(120%);
      }
      
      .high-contrast * {
        border-color: #fff !important;
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

  toggleHighContrast() {
    this.isHighContrast = !this.isHighContrast;
    document.body.classList.toggle('high-contrast', this.isHighContrast);
    
    // Save preference
    localStorage.setItem('highContrast', this.isHighContrast);
    
    // Update toggle button
    const toggle = document.querySelector('.contrast-toggle');
    if (toggle) {
      toggle.innerHTML = this.isHighContrast ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', this.isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode');
    }
  }

  changeFontSize(delta) {
    this.fontSize = Math.max(80, Math.min(200, this.fontSize + delta));
    document.documentElement.style.fontSize = `${this.fontSize}%`;
    
    // Save preference
    localStorage.setItem('fontSize', this.fontSize);
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

  // Load saved preferences
  loadPreferences() {
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      this.toggleHighContrast();
    }
    
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      this.fontSize = parseInt(savedFontSize);
      this.changeFontSize(0); // Apply saved size
    }
  }
}

// Initialize accessibility features
let accessibilityManager;
document.addEventListener('DOMContentLoaded', () => {
  accessibilityManager = new AccessibilityManager();
  accessibilityManager.loadPreferences();
});

// Export for global access
window.accessibilityManager = accessibilityManager; 