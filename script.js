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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animated counter for statistics
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, duration / steps);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats when visible
            if (entry.target.classList.contains('stats-container')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const impactCards = document.querySelectorAll('.impact-card');
    const statsContainer = document.querySelector('.stats-container');
    
    cards.forEach(card => observer.observe(card));
    timelineItems.forEach(item => observer.observe(item));
    impactCards.forEach(card => observer.observe(card));
    if (statsContainer) observer.observe(statsContainer);
});

// Combined scroll handler for better performance
let lastScroll = 0;
let ticking = false;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    // Header shadow effect
    if (header) {
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Parallax effect for hero
    if (hero) {
        hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
        hero.style.opacity = 1 - (currentScroll / 600);
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// Add hover effect to globe
const globe = document.querySelector('.globe');
if (globe) {
    globe.addEventListener('mouseenter', () => {
        globe.style.animationPlayState = 'paused';
    });
    
    globe.addEventListener('mouseleave', () => {
        globe.style.animationPlayState = 'running';
    });
}

// Create network connections animation
function createConnections() {
    const connectionsContainer = document.querySelector('.connections');
    if (!connectionsContainer) return;
    
    // Create connection lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.width = '2px';
        line.style.height = '50px';
        line.style.background = 'rgba(52, 152, 219, 0.5)';
        line.style.transformOrigin = 'top';
        line.style.animation = `connectionPulse ${2 + i * 0.5}s ease-in-out infinite`;
        
        const angle = (360 / 5) * i;
        line.style.left = '50%';
        line.style.top = '50%';
        line.style.transform = `rotate(${angle}deg)`;
        
        connectionsContainer.appendChild(line);
    }
}

// Add CSS for connection pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes connectionPulse {
        0%, 100% {
            opacity: 0.3;
            height: 50px;
        }
        50% {
            opacity: 0.8;
            height: 80px;
        }
    }
    
    .visible {
        animation: fadeInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize connections and card effects on load
document.addEventListener('DOMContentLoaded', () => {
    createConnections();
    
    // Add interactive tooltip effect for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.borderLeft = '4px solid #3498db';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
    
    // Log page load
    console.log('The World\'s Grasp on Society - Page Loaded Successfully');
    console.log('Exploring the intersection of technology and human experience...');
});
