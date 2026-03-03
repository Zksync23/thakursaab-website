/* ================================
   THAKURSAAB — Interactive JavaScript
   Particles | Typing | Scroll Effects
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypingEffect();
    initScrollReveal();
    initNavbar();
    initCounters();
    initSkillBars();
    initContactForm();
});

/* === PARTICLE ANIMATION (Canvas) === */
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.05;
            this.color = Math.random() > 0.6 ? '0, 192, 243' : '0, 212, 170';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width + 10) this.x = -10;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.y > canvas.height + 10) this.y = -10;
            if (this.y < -10) this.y = canvas.height + 10;
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    const opacity = (1 - dist / 140) * 0.08;
                    ctx.strokeStyle = `rgba(0, 192, 243, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* === TYPING EFFECT === */
function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
        'Python Automation Expert',
        'Telegram Bot Developer',
        'Web Scraping Specialist',
        'Crypto Airdrops Automation',
        'VPS & Cloud Management',
        'Script Development Pro'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

/* === SCROLL REVEAL ANIMATIONS === */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                const delayMs = parseFloat(delay) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delayMs);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* === NAVBAR === */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('open');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('open');
            });
        });
    }

    // Active link based on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* === COUNTER ANIMATION === */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));

    function animateCounter(element, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }
}

/* === SKILL BARS ANIMATION === */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 300);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

/* === CONTACT FORM === */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:kiranthakor01432@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;

        // Show success animation
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
        btn.style.background = '#4ade80';
        btn.style.borderColor = '#4ade80';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            form.reset();
        }, 3000);
    });
}

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

/* === PARALLAX SUBTLE EFFECT === */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    }
});
