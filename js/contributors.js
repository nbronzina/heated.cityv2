// Initialize Map for Contributors
function initializeContributorsMap() {
    const mapElement = document.getElementById('map');

    if (mapElement) {
        console.log('Map element found');
        const map = L.map(mapElement).setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href=\"https://openstreetmap.org\">OpenStreetMap</a>'
        }).addTo(map);

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 24px; height: 24px; background-color: #f4a261; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const locations = [
            { name: "Pablo Sanguinetti", coords: [-34.6037, -58.3816] },
            { name: "Ana García", coords: [40.4168, -3.7038] },
            { name: "Callagun Smith", coords: [-37.8136, 144.9631] },
            { name: "Kamau Mwangi", coords: [-1.2921, 36.8219] },
            { name: "Priya Sharma", coords: [28.6139, 77.2090] },
            { name: "Himari Satō", location: [35.0116, 135.7681], image: "img/HimariSato.png" },
        ];

        locations.forEach(location => {
            L.marker(location.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>${location.name}</b>`);
        });
    } else {
        console.error('Map element not found');
    }
}

// Initialize Map on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initializeContributorsMap();
});
