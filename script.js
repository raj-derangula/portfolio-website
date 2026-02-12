// ==================== Cursor Glow Effect ====================
// Subtle red radial gradient that follows the mouse with a slight lag.
// Automatically hidden on mobile via CSS (touch users don't have a cursor).

const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
});

// Fade out when the cursor leaves the window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

// ==================== Mobile Navigation Toggle ====================

const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans  = navToggle.querySelectorAll('span');
    const isOpen = navMenu.classList.contains('active');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)'  : 'none';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -5px)' : 'none';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== Smooth Scrolling ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
    });
});

// ==================== Navbar Shadow on Scroll ====================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.scrollY > 60
        ? '0 4px 16px rgba(0,0,0,0.4)'
        : 'none';
});

// ==================== Fade-in on Scroll ====================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll(
        '.project-card, .social-link, .about-content, .resume-content, .looking-for-box'
    );
    targets.forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(el);
    });
});

// ==================== Auto Copyright Year ====================

const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
