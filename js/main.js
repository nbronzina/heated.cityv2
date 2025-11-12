/**
 * HEATED CITY - Main JavaScript
 * For index.html
 */

console.log('Heated City - Cities That Care');

// Smooth scroll functionality for CTA button
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const neighborhoodsSection = document.querySelector('.neighborhoods-section');
            if (neighborhoodsSection) {
                neighborhoodsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
