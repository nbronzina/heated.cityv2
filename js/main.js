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

// Initialize Map
function initializeMap(centerCoords, locations) {
    const mapElement = document.getElementById('map');

    if (mapElement) {
        console.log('Map element found');
        const map = L.map(mapElement).setView(centerCoords, 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href=\"https://openstreetmap.org\">OpenStreetMap</a>'
        }).addTo(map);

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 24px; height: 24px; background-color: #f4a261; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        locations.forEach(location => {
            L.marker(location.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>${location.name}</b>`);
        });
    } else {
        console.error('Map element not found');
    }
}

// Initialize Page-specific Features
function initializePageFeatures() {
    // Inicializar slideshow
    const slides = document.querySelectorAll(".slideshow img");
    console.log(slides); // Verificar si se seleccionan las imágenes correctamente
    initializeSlideshow(slides);

    // Título de la página para inicializar mapas específicos
    const title = document.querySelector('title').textContent;
    console.log(title); // Verificar el título de la página

    if (title.includes('Kyoto')) {
        initializeMap([35.0116, 135.7681], [
            { name: "Hikari Machiya Studio", coords: [35.0035, 135.7780] },
            { name: "Akari no Michi", coords: [35.0045, 135.7795] },
            { name: "Hozugawa Eco-Island Center", coords: [35.0129, 135.6778] },
            { name: "Bamboo Grove Knowledge Trail", coords: [35.0168, 135.6713] },
            { name: "Kura no Megumi", coords: [34.9305, 135.7630] },
            { name: "Midori no Kura", coords: [34.9310, 135.7645] },
        ]);
    }

    if (title.includes('Contributors')) {
        initializeMap([20, 0], [
            { name: "Pablo Sanguinetti", coords: [-34.6037, -58.3816] },
            { name: "Ana García", coords: [40.4168, -3.7038] },
            { name: "Callagun Smith", coords: [-37.8136, 144.9631] },
            { name: "Kamau Mwangi", coords: [-1.2921, 36.8219] },
            { name: "Priya Sharma", coords: [28.6139, 77.2090] },
            { name: "Himari Satō", coords: [35.0116, 135.7681] },
        ]);
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
    initializePageFeatures();
});
