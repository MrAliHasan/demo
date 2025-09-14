// Modern JavaScript for AireChemistry Website
class AireChemistryApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupHeroSlideshow();
        this.setupProductNavigation();
        this.setupServiceNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupDataVisualizations();
    }

    // Loading Screen Management
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500);
        });
    }

    // Navigation System
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Smooth scroll to section
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 80;
            const targetPosition = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Hero Slideshow
    setupHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 6000);
        }
    }

    // Product Navigation
    setupProductNavigation() {
        const navBtns = document.querySelectorAll('.product-nav-btn');
        const productDetails = document.querySelectorAll('.product-detail');

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetProduct = btn.getAttribute('data-product');
                
                // Update button states
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update product displays
                productDetails.forEach(detail => {
                    detail.classList.remove('active');
                    if (detail.id === targetProduct) {
                        detail.classList.add('active');
                    }
                });
            });
        });
    }

    // Service Navigation
    setupServiceNavigation() {
        const navBtns = document.querySelectorAll('.service-nav-btn');
        const serviceDetails = document.querySelectorAll('.service-detail');

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetService = btn.getAttribute('data-service');
                
                // Update button states
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update service displays
                serviceDetails.forEach(detail => {
                    detail.classList.remove('active');
                    if (detail.id === targetService) {
                        detail.classList.add('active');
                    }
                });
            });
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Navbar background changes
            if (scrolled > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }
            
            // Show/hide scroll to top button
            if (scrolled > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            try {
                await this.simulateFormSubmission();
                
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--status-good)';
                
                // Show success notification
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                // Error state
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                submitBtn.style.background = 'var(--status-unhealthy)';
                
                this.showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--status-good)' : 'var(--status-unhealthy)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close')?.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Animation Setup
    setupAnimations() {
        // Initialize AOS (Animate On Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
        }

        // Custom intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.solution-card, .credential-card, .tech-feature, .crisis-stat'
        );
        
        animateElements.forEach(el => observer.observe(el));
    }

    // Data Visualizations
    setupDataVisualizations() {
        this.animateHeroTechFeatures();
        this.setupRealtimeUpdates();
    }

    animateHeroTechFeatures() {
        const techFeatures = document.querySelectorAll('.tech-feature-item');
        
        techFeatures.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.animation = 'fadeInUp 0.6s ease forwards';
                feature.style.opacity = '0';
                feature.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }, 50);
            }, 1500 + (index * 200));
        });
    }

    setupRealtimeUpdates() {
        // Animate the NASA credential badge periodically
        setInterval(() => {
            const nasaBadge = document.querySelector('.nasa-credential');
            if (nasaBadge) {
                nasaBadge.style.animation = 'pulse-glow 1s ease-in-out';
                setTimeout(() => {
                    nasaBadge.style.animation = '';
                }, 1000);
            }
        }, 10000); // Every 10 seconds
    }

    // Utility Methods
    debounce(func, wait) {
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

    throttle(func, limit) {
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
}

// Global Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = 80;
        const targetPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function requestQuote() {
    // Scroll to contact section
    scrollToSection('contact');
    
    // Focus on the contact form after a short delay
    setTimeout(() => {
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) {
            nameInput.focus();
        }
    }, 1000);
}

// Additional Animation Styles
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }

    /* Mobile Navigation Toggle Animation */
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Enhanced hover effects */
    .solution-card:hover .solution-icon {
        transform: scale(1.1) rotate(5deg);
    }

    .credential-card:hover .credential-card i {
        transform: scale(1.2);
        color: var(--accent-cyan);
    }

    /* Smooth transitions for all interactive elements */
    * {
        transition-property: transform, opacity, background-color, border-color, color, box-shadow;
        transition-duration: 0.3s;
        transition-timing-function: ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
    }

    mark(name) {
        this.metrics[name] = performance.now() - this.startTime;
    }

    log() {
        console.table(this.metrics);
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    const perfMonitor = new PerformanceMonitor();
    perfMonitor.mark('DOM Content Loaded');
    
    const app = new AireChemistryApp();
    perfMonitor.mark('App Initialized');
    
    // Log performance metrics in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', () => {
            perfMonitor.mark('Window Loaded');
            perfMonitor.log();
        });
    }
});

// Enhanced Error Handling
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(registrationError => console.log('SW registration failed:', registrationError));
    });
}
