// Modern JavaScript with Enhanced Functionality

// Initialize AOS with optimized settings for speed
// Global animation tuning: slightly faster & smoother
console.log("%c🐣 Welcome, curious developer! You've found the Cryvex Easter Egg.", "color:#8b5cf6;font-size:14px;font-weight:bold;");


AOS.init({
    duration: 320,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    offset: 40,
    delay: 0,
    disable: false
});

// Front-end Input Security: sanitize and harden all inputs and forms
class InputSecurity {
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        this.init();
    }

    init() {
        this.hardenAttributes();
        this.attachSanitizers();
    }

    sanitize(value, field) {
        if (typeof value !== 'string') return value;

        // 1. Normalize Unicode for consistency (prevents homoglyph attacks)
        let cleaned = value.normalize('NFKC');

        // 2. First sanitization pass with DOMPurify (removes HTML/JS)
        cleaned = DOMPurify.sanitize(cleaned, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

        // 3. Decode HTML entities
        const tmp = document.createElement('div');
        tmp.innerHTML = cleaned;
        cleaned = tmp.textContent || tmp.innerText || '';

        // 4. Second sanitization pass after decoding
        cleaned = DOMPurify.sanitize(cleaned, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

        // 5. Normalize whitespace
        cleaned = cleaned.replace(/\s+/g, ' ').trim();

        // 6. Field-specific constraints
        if (field) {
            const type = (field.getAttribute('type') || field.tagName).toLowerCase();
            if (type === 'email') {
                cleaned = cleaned.slice(0, 254);
                if (!this.emailRegex.test(cleaned)) {
                    cleaned = cleaned.replace(/[^a-zA-Z0-9@._+-]/g, '');
                }
            } else if (type === 'text' || type === 'textarea' || field.tagName.toLowerCase() === 'textarea') {
                cleaned = cleaned.replace(/[^\p{L}\p{N}\s.,;:'"!\-()?_@]/gu, '');
            }
        }

        // 7. Block dangerous protocols
        if (/^(javascript|data|vbscript):/i.test(cleaned)) {
            cleaned = '';
        }

        return cleaned;
    }

    hardenAttributes() {
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.setAttribute('maxlength', '100');
            input.setAttribute('autocomplete', 'name');
            input.setAttribute('spellcheck', 'false');
            input.setAttribute('inputmode', 'text');
        });
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.setAttribute('maxlength', '254');
            input.setAttribute('autocomplete', 'email');
            input.setAttribute('inputmode', 'email');
            input.setAttribute('pattern', "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}");
        });
        document.querySelectorAll('textarea').forEach(area => {
            area.setAttribute('maxlength', '2000');
            area.setAttribute('spellcheck', 'true');
        });
    }

    attachSanitizers() {
        const fields = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
        fields.forEach(field => {
            field.addEventListener('input', () => {
                const cleaned = this.sanitize(field.value, field);
                if (cleaned !== field.value) field.value = cleaned;
            });
            field.addEventListener('paste', () => {
                setTimeout(() => {
                    const cleaned = this.sanitize(field.value, field);
                    if (cleaned !== field.value) field.value = cleaned;
                }, 0);
            });
        });

        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(field => {
                    field.value = this.sanitize(field.value, field);
                });
            });
        });
    }
}

// Enhanced Navbar with smooth transitions
class ModernNavbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.lastScroll = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleActiveLinks();
        this.addScrollListener();
    }
    
    handleScroll() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const currentScroll = window.pageYOffset;
            
            // Hide/show navbar on scroll (optimized)
            if (currentScroll > this.lastScroll && currentScroll > this.scrollThreshold) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            // Add background on scroll (optimized)
            if (currentScroll > this.scrollThreshold) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.boxShadow = '0 4px 20px rgba(79, 195, 247, 0.1)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.boxShadow = 'none';
            }
            
            this.lastScroll = currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, { passive: true });
    }
    
    handleMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.navLinks.classList.toggle('active');
                this.navToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close mobile menu when clicking on links
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.navLinks.classList.remove('active');
                    this.navToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target) && this.navLinks.classList.contains('active')) {
                    this.navLinks.classList.remove('active');
                    this.navToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }
    
    handleActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    addScrollListener() {
        window.addEventListener('scroll', () => {
            // Add scroll progress indicator
            const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            this.updateScrollProgress(scrollProgress);
        });
    }
    
    updateScrollProgress(progress) {
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #4fc3f7, #29b6f6);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        progressBar.style.width = `${progress}%`;
    }
}

// Enhanced Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Modern Form Handler with better UX
class ModernFormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            this.addFormAnimations(form);
        });
    }
    
    async handleSubmit(e, form) {
        e.preventDefault();
        
    const submitBtn = form.querySelector('button[type="submit"], .submit-btn');
        const originalText = submitBtn.textContent;
        const originalState = submitBtn.disabled;

        // Sanitize all fields prior to any processing
        form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(field => {
            const sanitizer = window.__inputSecurityInstance;
            if (sanitizer) field.value = sanitizer.sanitize(field.value, field);
        });
        
        // Add loading state
    submitBtn.disabled = true;
    submitBtn.style.pointerEvents = 'none';
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateSubmission();
            
            // Success state
            submitBtn.innerHTML = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = originalState;
                submitBtn.style.pointerEvents = '';
                submitBtn.classList.remove('loading');
            }, 3000);
            
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '✗ Error - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = originalState;
                submitBtn.style.pointerEvents = '';
                submitBtn.classList.remove('loading');
            }, 3000);
        }
    }
    
    async simulateSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    addFormAnimations(form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Enhanced Project Cards with hover effects
class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.addHoverEffects(card);
            this.addClickHandlers(card);
        });
    }
    
    addHoverEffects(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.015)';
            card.style.boxShadow = '0 20px 40px rgba(79, 195, 247, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    }
    
    addClickHandlers(card) {
        const learnMoreBtn = card.querySelector('.learn-more');
        if (learnMoreBtn) {
            // Follow the link directly without opening modal/menu
            learnMoreBtn.addEventListener('click', (e) => {
                // Allow default navigation behavior
                // Ensure links with href="#" don't block navigation
                const href = learnMoreBtn.getAttribute('href');
                if (!href || href === '#') {
                    e.preventDefault();
                }
            });
        }
    }
    // Removed showProjectModal to disable modal behavior
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleParallax();
        });
    }
    
    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Enhanced Loading States
class LoadingStates {
    constructor() {
        this.init();
    }
    
    init() {
        this.addPageLoadAnimation();
        this.addImageLoadHandlers();
    }
    
    addPageLoadAnimation() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
            
            // Animate elements on page load
            const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .scale-in');
            animatedElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
        });
    }
    
    addImageLoadHandlers() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        });
    }
}

// Intersection Observer for reveal animations
class RevealAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal, .project-card, .about-content, .contact-content').forEach(el => {
            observer.observe(el);
        });
    }
}

// Enhanced CTA Buttons
class CTAButtons {
    constructor() {
        this.init();
    }
    
    init() {
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        ctaButtons.forEach(button => {
            this.addRippleEffect(button);
            this.addHoverEffects(button);
        });
    }
    
    addRippleEffect(button) {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    addHoverEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.THEME_KEY = 'cryvex_theme';
        this.htmlEl = document.documentElement;
        this.toggleButtons = [];
        this.init();
    }
    // Theme switching removed; site locked to light design.
    detectExistingToggleButtons() {
        this.toggleButtons = Array.from(document.querySelectorAll('.theme-toggle'));
    }
    applyStoredTheme() {
        const stored = localStorage.getItem(this.THEME_KEY);
        if (stored === 'dark') {
            this.htmlEl.classList.add('dark');
        } else if (stored === 'light') {
            this.htmlEl.classList.remove('dark');
        } else {
            // No explicit preference stored; follow system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.htmlEl.classList.toggle('dark', prefersDark);
        }
        this.syncToggleLabels();
    }
    toggleTheme() {
        const isDark = this.htmlEl.classList.toggle('dark');
        localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
        this.syncToggleLabels();
    }
    syncToggleLabels() {
        const isDark = this.htmlEl.classList.contains('dark');
        this.toggleButtons.forEach(btn => {
            const textSpan = btn.querySelector('.theme-toggle-text');
            if (textSpan) textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            btn.title = textSpan.textContent;
        });
        // Swap logos (text variant + icon variant) based on theme
        document.querySelectorAll('[data-logo]').forEach(img => {
            const dark = img.getAttribute('data-logo-dark');
            const light = img.getAttribute('data-logo-light');
            if (dark && light) {
                img.src = isDark ? dark : light;
            }
        });
    }
    bindEvents() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.theme-toggle');
            if (target) {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        window.addEventListener('storage', (e) => {
            if (e.key === this.THEME_KEY) this.applyStoredTheme();
        });
    }
    observeSystemPreference() {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't explicitly chosen
            const stored = localStorage.getItem(this.THEME_KEY);
            if (!stored) {
                this.htmlEl.classList.toggle('dark', e.matches);
                this.syncToggleLabels();
            }
        });
    }
    observeFooterInsertion() {
        // In case footer is dynamically injected later
        const observer = new MutationObserver(() => {
            const newButtons = Array.from(document.querySelectorAll('.theme-toggle'));
            if (newButtons.length !== this.toggleButtons.length) {
                this.toggleButtons = newButtons;
                this.syncToggleLabels();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize input security first
    window.__inputSecurityInstance = new InputSecurity();
    new ModernNavbar();
    new SmoothScroller();
    new ModernFormHandler();
    new ProjectCards();
    new ParallaxEffects();
    new LoadingStates();
    new RevealAnimations();
    new CTAButtons();
    new ThemeManager();
    // Theme switching removed; site locked to light design.
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    // Add ripple animation CSS
    const rippleCSS = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.textContent = copyrightYear.textContent.replace('2025', new Date().getFullYear());
    }
});

// Mobile performance optimizations
const isMobile = window.innerWidth <= 768;

// Reduce motion on mobile for battery saving
if (isMobile) {
    document.documentElement.style.setProperty('--transition', '0.2s ease');
    
    // Disable expensive animations on mobile
    const expensiveAnimations = document.querySelectorAll('.floating-shapes, .particle-bg');
    expensiveAnimations.forEach(el => {
        el.style.display = 'none';
    });
}

// Optimize touch interactions
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Faster tap response
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// Preload critical images
const criticalImages = [
    'img/cryvex-logo-black.png',
    'img/cryvex-logo-text.png',
    'img/cryvex-dev.png'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Performance optimizations
window.addEventListener('load', () => {
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        img.src = img.dataset.src;
    });
});
