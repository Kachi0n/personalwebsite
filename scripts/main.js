// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add to your existing JavaScript
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.parentElement.querySelector('.project-details');
        const isExpanded = details.classList.contains('active');
        
        details.classList.toggle('active');
        
        // Update button text
        button.textContent = isExpanded ? 'Read More ▼' : 'Read Less ▼';
    });
});

// Add this new carousel functionality
function initializeCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-images img');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Create dots
        images.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;

        function updateCarousel(newIndex) {
            images[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = newIndex;
            
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        // Event listeners
        prev.addEventListener('click', () => {
            const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
            updateCarousel(newIndex);
        });

        next.addEventListener('click', () => {
            const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
            updateCarousel(newIndex);
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateCarousel(idx);
            });
        });
    });
}

// Call this after the page loads
document.addEventListener('DOMContentLoaded', initializeCarousels);
