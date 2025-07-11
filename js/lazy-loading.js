// Lazy Loading Implementation
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
      
      // Add fade-in effect
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in';
      
      img.onload = () => {
        img.style.opacity = '1';
      };
    }
  }

  loadAllImages() {
    this.images.forEach(img => this.loadImage(img));
  }
}

// Image optimization helper
class ImageOptimizer {
  static optimizeSrc(src, width = null, quality = 80) {
    if (!src) return src;
    
    // If using external CDN, add optimization parameters
    if (src.includes('pinimg.com')) {
      const params = new URLSearchParams();
      if (width) params.append('w', width);
      params.append('q', quality);
      return `${src}?${params.toString()}`;
    }
    
    return src;
  }

  static getResponsiveSrc(src, sizes = [320, 640, 1280]) {
    if (!src) return src;
    
    const srcset = sizes.map(size => 
      `${this.optimizeSrc(src, size)} ${size}w`
    ).join(', ');
    
    return srcset;
  }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
});

// Export for use in other scripts
window.LazyLoader = LazyLoader;
window.ImageOptimizer = ImageOptimizer; 