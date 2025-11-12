/**
 * HEATED CITY - Main JavaScript
 * For index.html
 */

console.log('Heated City - Cities That Care');

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================
    // CTA BUTTON - Smooth scroll
    // ======================================
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const neighborhoodsSection = document.querySelector('.neighborhoods-section');
            if (neighborhoodsSection) {
                neighborhoodsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ======================================
    // NEIGHBORHOODS SECTION - Tab functionality
    // ======================================
    const sectionTabs = document.querySelectorAll('.tab-btn');
    sectionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            sectionTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Log the action (you can add filtering logic here)
            console.log('Neighborhood tab clicked:', this.textContent);
        });
    });
    
    // ======================================
    // CITIES SECTION - Tab functionality with filtering
    // ======================================
    const cityTabs = document.querySelectorAll('.city-tab');
    const cityCards = document.querySelectorAll('.city-card');
    
    cityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            cityTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const selectedRegion = this.getAttribute('data-region');
            
            // Filter cities based on selected region
            cityCards.forEach(card => {
                const cardRegion = card.getAttribute('data-region');
                
                if (selectedRegion === 'all' || cardRegion === selectedRegion) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log('City region filter:', selectedRegion);
        });
    });
    
    // ======================================
    // NEIGHBORHOOD CARDS - Click to navigate
    // ======================================
    const neighborhoodCards = document.querySelectorAll('.neighborhood-card');
    neighborhoodCards.forEach(card => {
        card.addEventListener('click', function() {
            const citySlug = this.getAttribute('data-city');
            if (citySlug) {
                window.location.href = `cities/${citySlug}.html`;
            }
        });
    });
    
    // ======================================
    // CITY CARDS - Click to navigate
    // ======================================
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            const citySlug = this.getAttribute('data-city');
            if (citySlug) {
                window.location.href = `cities/${citySlug}.html`;
            }
        });
    });
    
    // ======================================
    // SEARCH ICON - Placeholder functionality
    // ======================================
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Search functionality coming soon!');
        });
    }
    
    // ======================================
    // SMOOTH SCROLL for internal links
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // ======================================
    // PARALLAX EFFECT on hero image
    // ======================================
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const heroImg = document.querySelector('.hero-bg');
                if (heroImg) {
                    heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('Heated City initialized successfully');
});
