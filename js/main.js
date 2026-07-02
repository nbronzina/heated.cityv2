/**
 * HEATED CITY - Main JavaScript
 * For index.html
 */

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
    // CITIES SECTION - Filter by region
    // ======================================
    const cityTabs = document.querySelectorAll('.city-tab');
    const cityCards = document.querySelectorAll('.city-card');

    cityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            cityTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const selectedRegion = this.getAttribute('data-region');

            cityCards.forEach(card => {
                const cardRegion = card.getAttribute('data-region');
                card.style.display = (selectedRegion === 'all' || cardRegion === selectedRegion) ? 'flex' : 'none';
            });
        });
    });

    // ======================================
    // SMOOTH SCROLL for internal links
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                const heroImg = document.querySelector('.hero-bg');
                if (heroImg) {
                    heroImg.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});
