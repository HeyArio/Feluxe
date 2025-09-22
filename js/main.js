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
    setupMobileMenu();
    setupPDFViewer();
    setupEnhancedContact()
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
            window.open('assets/pdfs/feluxe_eng.pdf', '_blank');
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

/* ===========================================
   MOBILE MENU FUNCTIONALITY - ADD THIS TO YOUR main.js
   =========================================== */
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileToggle || !mobileMenu) return;
    
    // Toggle menu on hamburger click
    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        this.classList.toggle('active');
    });

    // Close menu when clicking menu links
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });
}

// DON'T FORGET: Add setupMobileMenu() to your initializeWebsite() function
// Update your existing initializeWebsite() function to include this:
/*
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupPawPrintAnimation();
    setupCatalogInteractions();
    setupMobileMenu(); // ADD THIS LINE
}
*/
/* ===========================================
   MOBILE MENU FUNCTIONALITY - ADD TO main.js
   =========================================== */
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileToggle || !mobileMenu) return;
    
    // Toggle menu on hamburger click
    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        this.classList.toggle('active');
    });

    // Close menu when clicking menu links
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });
}

/* ===========================================
   UPDATE YOUR EXISTING initializeWebsite() FUNCTION
   Make sure it includes setupMobileMenu()
   =========================================== */

// Find your existing initializeWebsite() function and make it look like this:
/*
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupPawPrintAnimation();
    setupCatalogInteractions();
    setupMobileMenu(); // ADD THIS LINE
}
*/
/* ===========================================
   PDF VIEWER FUNCTIONALITY - ADD TO main.js
   =========================================== */

/* ===========================================
   ENHANCED PDF VIEWER WITH ZOOM CONTROLS
   Replace the PDF viewer section in main.js
   =========================================== */

/* ===========================================
   SMOOTH ZOOM PDF VIEWER - REPLACE PDF section in main.js
   =========================================== */

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
let canvas = null;
let ctx = null;

function setupPDFViewer() {
    // Initialize PDF.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    
    // Get DOM elements
    const modal = document.getElementById('pdf-modal');
    const closeBtn = document.getElementById('pdf-close');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const downloadBtn = document.getElementById('pdf-download');
    const loading = document.getElementById('pdf-loading');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const fitWidthBtn = document.getElementById('fit-width');
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomInfo = document.getElementById('zoom-info');
    
    canvas = document.getElementById('pdf-canvas');
    ctx = canvas.getContext('2d');
    
    if (!modal || !canvas) return;
    
    // Event listeners
    closeBtn.addEventListener('click', closePDFViewer);
    prevBtn.addEventListener('click', onPrevPage);
    nextBtn.addEventListener('click', onNextPage);
    downloadBtn.addEventListener('click', downloadPDF);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    fitWidthBtn.addEventListener('click', fitToWidth);
    
    // Zoom slider event listener
    zoomSlider.addEventListener('input', function(e) {
        const newScale = parseInt(e.target.value) / 100;
        setZoom(newScale);
    });
    
    // Mouse wheel zoom in PDF viewer
    const pdfViewer = document.querySelector('.pdf-viewer');
    pdfViewer.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            
            if (e.deltaY < 0) {
                // Scroll up - zoom in
                const newScale = Math.min(scale * 1.1, 3.0);
                setZoom(newScale);
            } else {
                // Scroll down - zoom out
                const newScale = Math.max(scale * 0.9, 0.3);
                setZoom(newScale);
            }
        }
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePDFViewer();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closePDFViewer();
        }
    });
    
    // Update catalog buttons to open PDF viewer
    const catalogButtons = document.querySelectorAll('.catalog-btn');
    catalogButtons.forEach(button => {
        if (button.textContent.includes('View Full Catalog')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openPDFViewer();
            });
        }
    });
}

function openPDFViewer() {
    const modal = document.getElementById('pdf-modal');
    const loading = document.getElementById('pdf-loading');
    
    modal.classList.add('open');
    loading.classList.add('show');
    
    // Reset to first page
    pageNum = 1;
    
    // Load PDF
    const pdfPath = 'assets/pdfs/feluxe_eng.pdf';
    
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
            
            // Auto-fit to width on first load
            autoFitToWidth().then(() => {
                document.getElementById('page-info').textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
                renderPage(pageNum);
                loading.classList.remove('show');
            });
        }).catch(function(error) {
            console.error('Error loading PDF:', error);
            loading.innerHTML = `
                <div style="color: white; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Unable to load catalog. Please try downloading instead.</p>
                </div>
            `;
        });
    } else {
        console.error('PDF.js not loaded');
        loading.innerHTML = `
            <div style="color: white; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>PDF viewer not available. Please download instead.</p>
            </div>
        `;
    }
}

function autoFitToWidth() {
    return new Promise((resolve) => {
        if (!pdfDoc) {
            resolve();
            return;
        }
        
        pdfDoc.getPage(1).then(function(page) {
            const viewer = document.querySelector('.pdf-viewer');
            const viewerWidth = viewer.clientWidth - 60; // Account for padding
            const viewport = page.getViewport({scale: 1.0});
            
            scale = viewerWidth / viewport.width;
            
            // Limit scale between 0.3 and 3.0
            scale = Math.max(0.3, Math.min(3.0, scale));
            
            updateZoomControls();
            resolve();
        });
    });
}

function renderPage(num) {
    pageRendering = true;
    
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    // Update page counters
    document.getElementById('page-info').textContent = `Page ${num} of ${pdfDoc.numPages}`;
    
    // Update button states
    document.getElementById('prev-page').disabled = (num <= 1);
    document.getElementById('next-page').disabled = (num >= pdfDoc.numPages);
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

function setZoom(newScale) {
    scale = Math.max(0.3, Math.min(3.0, newScale));
    updateZoomControls();
    queueRenderPage(pageNum);
}

function zoomIn() {
    const newScale = Math.min(scale * 1.1, 3.0); // Smaller increment: 1.1 instead of 1.25
    setZoom(newScale);
}

function zoomOut() {
    const newScale = Math.max(scale * 0.9, 0.3); // Smaller increment: 0.9 instead of 0.8
    setZoom(newScale);
}

function fitToWidth() {
    autoFitToWidth().then(() => {
        queueRenderPage(pageNum);
    });
}

function updateZoomControls() {
    const zoomPercent = Math.round(scale * 100);
    const zoomInfo = document.getElementById('zoom-info');
    const zoomSlider = document.getElementById('zoom-slider');
    
    if (zoomInfo) {
        zoomInfo.textContent = `${zoomPercent}%`;
    }
    
    if (zoomSlider) {
        zoomSlider.value = zoomPercent;
    }
}

function closePDFViewer() {
    const modal = document.getElementById('pdf-modal');
    const loading = document.getElementById('pdf-loading');
    
    modal.classList.remove('open');
    loading.classList.remove('show');
    
    // Clear canvas
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Reset variables
    pdfDoc = null;
    pageNum = 1;
    pageRendering = false;
    pageNumPending = null;
    scale = 1.0;
    
    // Reset zoom controls
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomInfo = document.getElementById('zoom-info');
    if (zoomSlider) zoomSlider.value = 100;
    if (zoomInfo) zoomInfo.textContent = '100%';
}

function downloadPDF() {
    // Create download link
    const link = document.createElement('a');
    link.href = 'assets/pdfs/feluxe_eng.pdf';
    link.download = 'feluxe_eng.pdf';
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    showNotification('Catalog download started!', 'success');
}
/* ===========================================
   EMAIL COPY FUNCTIONALITY - ADD TO main.js
   =========================================== */

function copyEmail() {
    const email = 'info@feluxe.com';
    
    // Try to use the Clipboard API first (modern browsers)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    // Update button temporarily
    const copyBtn = document.querySelector('.email-copy-btn');
    if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'rgba(76, 175, 80, 0.2)';
        copyBtn.style.borderColor = 'rgba(76, 175, 80, 0.5)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = 'transparent';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }, 2000);
    }
    
    // Show notification
    showNotification('Email address copied to clipboard!', 'success');
}

function showCopyError() {
    showNotification('Unable to copy email. Please select and copy manually: info@feluxe.com', 'error');
}

function setupEnhancedContact() {
    // Make email links more prominent
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks (you can add analytics here)
            console.log('Email link clicked:', this.href);
        });
    });
    
    // Add click tracking for the main CTA
    const emailCTA = document.querySelector('.email-primary-btn');
    if (emailCTA) {
        emailCTA.addEventListener('click', function() {
            console.log('Main email CTA clicked');
            // You can add analytics tracking here
        });
    }
}

/* ===========================================
   UPDATE YOUR initializeWebsite() FUNCTION
   =========================================== */

// Make sure your initializeWebsite() function includes setupEnhancedContact():
/*
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupPawPrintAnimation();
    setupCatalogInteractions();
    setupMobileMenu();
    setupPDFViewer();
    setupEnhancedContact(); // ADD THIS LINE
}
*/