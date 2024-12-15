// Toggle Fullscreen Menu
function toggleMenu() {
    document.getElementById('fullscreen-menu').classList.toggle('show');
}

// Slideshow Functionality
function initializeSlideshow(slides, interval = 10000) {
    let currentIndex = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, interval);
    }
}

// Add Event Listeners for Mobile Navigation
function setupMobileNavigation() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (menuIcon && closeIcon) {
        menuIcon.addEventListener("click", toggleMenu);
        closeIcon.addEventListener("click", toggleMenu);
    }
}

// Initialize Everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    setupMobileNavigation();
    const slides = document.querySelectorAll(".slideshow img");
    initializeSlideshow(slides);
});
