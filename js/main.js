// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress-bar');
const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = progress + '%';
};

// Back to top functionality
const backToTop = document.querySelector('.back-to-top');
const toggleBackToTop = () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navigation highlighting
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const handleScroll = () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

const highlightNavigation = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Smooth scrolling for navigation links
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Section animations
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerFadeIn = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    observerFadeIn.observe(element);
});

// Email copy functionality
const emailBtn = document.querySelector('.copy-email');
const email = 'mpchang17@gmail.com';
let tooltipTimeout;
let tooltip;

const createTooltip = (text, x, y) => {
    if (tooltip) tooltip.remove();
    tooltip = document.createElement('div');
    tooltip.className = 'email-tooltip';
    tooltip.textContent = text;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    document.body.appendChild(tooltip);
    return tooltip;
};

const removeTooltip = () => {
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 200);
    }
};

emailBtn.addEventListener('click', async (e) => {
    const rect = emailBtn.getBoundingClientRect();
    const x = rect.left + (rect.width / 2) - 50;
    const y = rect.bottom + 10;

    try {
        await navigator.clipboard.writeText(email);
        createTooltip('Email copied!', x, y);
    } catch (err) {
        createTooltip('Failed to copy', x, y);
    }

    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(removeTooltip, 2000);
});

// Event listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleBackToTop();
    highlightNavigation();
    handleScroll();
});

// Remove tooltip when scrolling
window.addEventListener('scroll', removeTooltip);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateScrollProgress();
    toggleBackToTop();
    highlightNavigation();
});