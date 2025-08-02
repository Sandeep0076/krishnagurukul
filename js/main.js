// Krishna Gurukul School - Main JavaScript File
// Modern ES6+ JavaScript with modular functions

class KrishnaGurukulWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleScrollEffects();
    this.loadGallery();
    this.setupMobileMenu();
    this.setupLanguageSelector();
    this.setupSmoothScrolling();
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => this.handleScroll());
    window.addEventListener('load', () => this.onPageLoad());
    window.addEventListener('resize', () => this.handleResize());
  }

  // Header scroll effects
  handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  // Mobile menu functionality
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', 
          navMenu.classList.contains('active')
        );
      });

      // Close mobile menu when clicking on links
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Language selector functionality
  setupLanguageSelector() {
    const languageBtn = document.querySelector('.language-btn');
    
    if (languageBtn) {
      languageBtn.addEventListener('click', () => {
        // Initialize Google Translate if not already done
        if (typeof google !== 'undefined' && google.translate) {
          // Toggle the translate widget
          const translateElement = document.getElementById('google_translate_element');
          if (translateElement) {
            translateElement.style.display = 
              translateElement.style.display === 'none' ? 'block' : 'none';
          }
        }
      });
    }
  }

  // Load and display gallery images
  async loadGallery() {
    try {
      const response = await fetch('data/gallery.json');
      const data = await response.json();
      this.renderGallery(data.gallery);
    } catch (error) {
      console.error('Error loading gallery:', error);
      this.handleGalleryError();
    }
  }

  renderGallery(galleryItems) {
    const galleryContainer = document.querySelector('.gallery-grid');
    
    if (!galleryContainer) return;

    // Take first 6 items for homepage preview
    const previewItems = galleryItems.slice(0, 6);
    
    galleryContainer.innerHTML = previewItems.map(item => `
      <div class="gallery-item" data-category="${item.category}">
        <img src="${item.url}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <div>
            <h4>${item.title}</h4>
            <p>${item.caption}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Add click handlers for lightbox effect
    this.setupGalleryLightbox();
  }

  handleGalleryError() {
    const galleryContainer = document.querySelector('.gallery-grid');
    if (galleryContainer) {
      galleryContainer.innerHTML = `
        <div class="text-center" style="grid-column: 1 / -1;">
          <p>Gallery images are loading. Please check back soon.</p>
        </div>
      `;
    }
  }

  // Simple lightbox functionality
  setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4')?.textContent || '';
        const caption = item.querySelector('p')?.textContent || '';
        
        this.openLightbox(img.src, title, caption);
      });
    });
  }

  openLightbox(imageSrc, title, caption) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img src="${imageSrc}" alt="${title}">
        <div class="lightbox-info">
          <h3>${title}</h3>
          <p>${caption}</p>
        </div>
      </div>
    `;

    // Add lightbox styles
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 31, 63, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 2rem;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      background: white;
      border-radius: 15px;
      overflow: hidden;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--primary-navy);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1;
    `;

    const img = lightbox.querySelector('img');
    img.style.cssText = `
      width: 100%;
      height: auto;
      display: block;
    `;

    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
      padding: 1.5rem;
      text-align: center;
    `;

    document.body.appendChild(lightbox);

    // Close lightbox handlers
    closeBtn.addEventListener('click', () => this.closeLightbox(lightbox));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox(lightbox);
      }
    });

    // ESC key handler
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox(lightbox);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      if (lightbox && lightbox.parentNode) {
        lightbox.parentNode.removeChild(lightbox);
      }
    }, 300);
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll effects for animations
  handleScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
      '.feature-card, .gallery-item, .welcome-content'
    );
    
    animateElements.forEach(el => observer.observe(el));
  }

  // Page load effects
  onPageLoad() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }

    // Add loaded class to body
    document.body.classList.add('loaded');
  }

  // Handle window resize
  handleResize() {
    // Close mobile menu on resize
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }
}

// Initialize Google Translate
function googleTranslateElementInit() {
  if (typeof google !== 'undefined' && google.translate) {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,pa',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new KrishnaGurukulWebsite();
});

// Make googleTranslateElementInit global for Google Translate
window.googleTranslateElementInit = googleTranslateElementInit; 