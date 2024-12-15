// Toggle Fullscreen Menu
function toggleMenu() {
    document.getElementById('fullscreen-menu').classList.toggle('show');
}

// Slideshow Functionality
function initializeSlideshow(slides, interval = 3000) {
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
        const map = L.map(mapElement).setView(centerCoords, 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href=\"https://openstreetmap.org\">OpenStreetMap</a>"
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
    }
}

// Initialize Page-specific Features
function initializePageFeatures() {
    const slides = document.querySelectorAll(".slideshow img");
    initializeSlideshow(slides);

    const title = document.querySelector('title').textContent;

    if (title.includes('Kyoto')) {
