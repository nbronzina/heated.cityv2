function toggleMenu() {
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    fullscreenMenu.classList.toggle('show');
}

function initializeSlideshow(slides, interval = 5000) {
    let currentIndex = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, interval);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slideshow img");

    if (slides.length > 0) {
        initializeSlideshow(slides);
    }
});

   // Menú de navegación
    if (menuIcon && closeIcon && fullscreenMenu) {
        menuIcon.addEventListener("click", toggleMenu);
        closeIcon.addEventListener("click", toggleMenu);
    }
