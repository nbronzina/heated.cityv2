// Función para alternar el menú de navegación
function toggleMenu() {
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    fullscreenMenu.classList.toggle('show');
}

// Función para inicializar el slideshow
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

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Referencias al menú de navegación
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const fullscreenMenu = document.getElementById('fullscreen-menu');

    // Referencia al slideshow
    const slides = document.querySelectorAll(".slideshow img");

    // Inicializa el menú de navegación
    if (menuIcon && closeIcon && fullscreenMenu) {
        menuIcon.addEventListener("click", toggleMenu);
        closeIcon.addEventListener("click", toggleMenu);
    }

    // Inicializa el slideshow si hay imágenes disponibles
    if (slides.length > 0) {
        initializeSlideshow(slides);
    }
});
