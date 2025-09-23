// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Language switcher
document.addEventListener('DOMContentLoaded', function() {
    const langEn = document.getElementById('lang-en');
    const langTr = document.getElementById('lang-tr');
    if (langEn && langTr) {
        langEn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('siteLang', 'en');
            location.reload();
        });
        langTr.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('siteLang', 'tr');
            location.reload();
        });
    }

    // Dil görünürlüğü
    var lang = localStorage.getItem('siteLang');
    if (!lang) {
        lang = 'en';
        localStorage.setItem('siteLang', 'en');
    }
    document.querySelectorAll('[data-lang]').forEach(function(el) {
        if (el.getAttribute('data-lang') === lang) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
    // Methodology circle hover sync effect (run after language toggling)
    setTimeout(function() {
        var circles = document.querySelectorAll('.circle-methodology .circle-segment');
        var descs = Array.from(document.querySelectorAll('.circle-methodology-descs .circle-desc')).filter(function(el){ return el.style.display !== 'none'; });
        circles.forEach(function(circle, idx) {
            circle.addEventListener('mouseenter', function() {
                if (descs[idx]) descs[idx].classList.add('glow');
            });
            circle.addEventListener('mouseleave', function() {
                if (descs[idx]) descs[idx].classList.remove('glow');
            });
        });
    }, 100);
});
// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .why-card, .step');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Terminal typing effect
const terminalLines = document.querySelectorAll('.terminal-line');
let currentLine = 0;

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    if (terminalLines.length > 0) {
        setTimeout(() => {
            typeWriter(terminalLines[0], '$ Penetration Testing', 30);
        }, 1000);
        
        setTimeout(() => {
            typeWriter(terminalLines[1], '$ Vulnerability Management', 30);
        }, 4000);
        
        setTimeout(() => {
            typeWriter(terminalLines[2], '$ Validation Testing', 30);
        }, 7000);
    }
});

// Parallax effect for hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const rate = scrolled * -0.5;
//         hero.style.transform = `translateY(${rate}px)`;
//     }
// });

// Accordion for methodology section
const accordionBtns = document.querySelectorAll('.accordion-btn');
accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Kapatılan tüm panelleri bul
        const allPanels = document.querySelectorAll('.accordion-panel');
        const allBtns = document.querySelectorAll('.accordion-btn');
        allPanels.forEach(panel => {
            if (panel !== this.nextElementSibling) {
                panel.classList.remove('open');
            }
        });
        allBtns.forEach(b => {
            if (b !== this) b.classList.remove('active');
        });
        // Toggle current
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.classList.toggle('open');
    });
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(10, 10, 10, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style); 