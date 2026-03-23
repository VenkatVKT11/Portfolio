// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 2000); // Let the bar animation finish
});

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.scrollY;
    navbar.classList.toggle('scrolled', current > 50);
    lastScroll = current;
}, { passive: true });

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('.section, .hero');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

function updateActive() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 150) {
            current = s.id;
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

// ===== Typing Animation =====
const typingEl = document.getElementById('typingText');
const roles = [
    'Data Analyst',
    'Python Developer',
    'Dashboard Builder',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const current = roles[roleIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing after a small delay
setTimeout(typeRole, 1200);

// ===== Scroll Reveal =====
const revealTargets = document.querySelectorAll(
    '.skill-group, .project-card, .timeline-item, .metric, .about-text, .about-metrics, .contact-form, .section-header'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings in the same grid
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.reveal');
                const idx = Array.from(siblings).indexOf(entry.target);
                const delay = idx * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
);

revealTargets.forEach(el => revealObserver.observe(el));

// ===== Animated Skill Bars =====
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('filled');
                skillObserver.unobserve(bar);
            }
        });
    },
    { threshold: 0.3 }
);

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Contact Form (Formspree) =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formFeedback = document.getElementById('formFeedback');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formAction = form.getAttribute('action');

    // Check if Formspree is configured (still has placeholder)
    if (formAction.includes('YOUR_FORM_ID') || !formAction.includes('formspree.io')) {
        // Fallback: simulate send for demo
        submitBtn.classList.add('sending');
        submitBtn.innerHTML = '<span>Sending...</span>';

        setTimeout(() => {
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('sent');
            submitBtn.innerHTML = '<span>Sent! ✓</span>';
            formFeedback.textContent = 'Thanks! Your message was received (demo mode — configure Formspree to go live).';
            formFeedback.className = 'form-feedback success';

            setTimeout(() => {
                submitBtn.classList.remove('sent');
                submitBtn.innerHTML = `<span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>`;
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
                form.reset();
            }, 3000);
        }, 1200);
        return;
    }

    // Real Formspree submission
    submitBtn.classList.add('sending');
    submitBtn.innerHTML = '<span>Sending...</span>';

    try {
        const data = new FormData(form);
        const response = await fetch(formAction, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('sent');
            submitBtn.innerHTML = '<span>Sent! ✓</span>';
            formFeedback.textContent = 'Thanks! Your message has been sent successfully.';
            formFeedback.className = 'form-feedback success';
            form.reset();

            setTimeout(() => {
                submitBtn.classList.remove('sent');
                submitBtn.innerHTML = `<span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>`;
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (err) {
        submitBtn.classList.remove('sending');
        formFeedback.textContent = 'Oops! Something went wrong. Please try again.';
        formFeedback.className = 'form-feedback error';
        submitBtn.innerHTML = `<span>Send Message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>`;
    }
});

// ===== Profile Image Fallback =====
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('error', () => {
        // Create initials fallback
        const ring = profileImg.parentElement;
        ring.innerHTML = `
      <div style="
        width: 100%; height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-2) 100%);
        border: 3px solid var(--bg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--accent);
        letter-spacing: -0.02em;
        user-select: none;
      ">VG</div>
    `;
    });
}
