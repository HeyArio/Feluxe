/* ===========================================
   LOTTIE ANIMATION SETUP
   =========================================== */
function setupLottieHoverEffects() {
    // First check if lottie is available
    if (typeof lottie === 'undefined') {
        console.error('Lottie library not loaded');
        return;
    }
    
    const animationContainer = document.getElementById('logo-animation');
    
    if (!animationContainer) {
        console.log('Animation container not found');
        return;
    }
    
    console.log('Loading Lottie animation...');
    
    // Load the animation
    const animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'cat-animation.json' // Your JSON file in the same folder as HTML
    });
    
    // Debug logging
    animation.addEventListener('DOMLoaded', function() {
        console.log('Lottie animation loaded successfully!');
        animationContainer.style.border = '2px solid green'; // Success indicator
    });
    
    animation.addEventListener('data_failed', function() {
        console.error('Failed to load animation file: cat-animation.json');
        console.error('Make sure the file exists and is valid JSON');
        animationContainer.style.border = '2px solid red'; // Error indicator
        animationContainer.innerHTML = '🐾'; // Fallback
    });
    
    // Hover effects
    animationContainer.addEventListener('mouseenter', function() {
        animation.setSpeed(1.5);
    });
    
    animationContainer.addEventListener('mouseleave', function() {
        animation.setSpeed(1);
    });
}/* ===========================================
   FELUXE CAT LITTER - MAIN JAVASCRIPT
   Interactive functionality, animations, form handling
   =========================================== */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/* ===========================================
   MAIN INITIALIZATION
   =========================================== */
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupPawPrintAnimation();
    setupCatalogInteractions();
}

/* ===========================================
   SMOOTH SCROLLING FOR NAVIGATION
   =========================================== */
function setupSmoothScrolling() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===========================================
   HEADER SCROLL EFFECTS
   =========================================== */
function setupHeaderEffects() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 40px rgba(160, 67, 140, 0.2)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 30px rgba(160, 67, 140, 0.15)';
        }
    });
}

/* ===========================================
   SCROLL ANIMATIONS
   =========================================== */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

/* ===========================================
   FORM HANDLING
   =========================================== */
function setupFormHandling() {
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
}

function handleFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your inquiry! Our team will contact you within 24 hours to discuss partnership opportunities.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
        
    }, 2000);
}

/* ===========================================
   FORM VALIDATION
   =========================================== */
function validateFormData(data) {
    // Check required fields
    if (!data.fullName || data.fullName.trim().length < 2) {
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return false;
    }
    
    if (!data.company || data.company.trim().length < 2) {
        return false;
    }
    
    if (!data.country || data.country.trim().length < 2) {
        return false;
    }
    
    if (!data.requirements || data.requirements.trim().length < 10) {
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ===========================================
   NOTIFICATION SYSTEM
   =========================================== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#4CAF50';
            break;
        case 'error':
            backgroundColor = '#f44336';
            break;
        case 'warning':
            backgroundColor = '#ff9800';
            break;
        default:
            backgroundColor = '#2196F3';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.4;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/* ===========================================
   FALLING PAW PRINTS ANIMATION
   =========================================== */
function setupPawPrintAnimation() {
    // Create falling paw print animation
    function createPawPrint() {
        const paw = document.createElement('div');
        paw.innerHTML = '🐾';
        paw.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: -60px;
            font-size: ${Math.random() * 8 + 14}px;
            opacity: 0.25;
            pointer-events: none;
            z-index: 1000;
            color: ${Math.random() > 0.5 ? '#a0438c' : '#1e3a5f'};
            animation: fall 15s linear infinite;
        `;
        
        document.body.appendChild(paw);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (paw.parentNode) {
                paw.parentNode.removeChild(paw);
            }
        }, 15000);
    }

    // Create CSS for falling animation if not already present
    if (!document.querySelector('#paw-animation-style')) {
        const style = document.createElement('style');
        style.id = 'paw-animation-style';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create paw prints every 3 seconds
    setInterval(createPawPrint, 3000);
}

/* ===========================================
   CATALOG INTERACTIONS
   =========================================== */
function setupCatalogInteractions() {
    const catalogThumbnail = document.querySelector('.catalog-thumbnail');
    const catalogButtons = document.querySelectorAll('.catalog-btn');
    
    if (catalogThumbnail) {
        catalogThumbnail.addEventListener('click', function() {
            // Open catalog in new window
            window.open('assets/pdfs/YASI CATALOUGE.pdf', '_blank');
        });
    }
    
    // Add click tracking for catalog buttons
    catalogButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('Catalog button clicked:', this.textContent.trim());
        });
    });
}

/* ===========================================
   UTILITY FUNCTIONS
   =========================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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

// Get viewport dimensions
function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ===========================================
   MOBILE MENU (if needed in future)
   =========================================== */
function setupMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be expanded when adding mobile hamburger menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            this.classList.toggle('active');
        });
    }
}

/* ===========================================
   PERFORMANCE MONITORING
   =========================================== */
function logPerformance() {
    // Log page load performance
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
    });
}

/* ===========================================
   ERROR HANDLING
   =========================================== */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Can be extended to send error reports to analytics
});

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformance();
}

/* ===========================================
   EXPORT FOR TESTING (if using modules)
   =========================================== */
// Uncomment if using ES6 modules
// export { 
//     initializeWebsite, 
//     setupSmoothScrolling, 
//     setupHeaderEffects, 
//     setupScrollAnimations,
//     setupFormHandling,
//     setupPawPrintAnimation
// };