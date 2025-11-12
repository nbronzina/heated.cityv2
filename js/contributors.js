/**
 * HEATED CITY - Contributors Map
 */

// Inicializar mapa
const map = L.map('contributorsMap').setView([20, 0], 2);

// Agregar tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Ciudades con coordenadas
const cities = [
    { name: 'Kyoto', coords: [35.0116, 135.7681], url: 'cities/kyoto.html' },
    { name: 'Buenos Aires', coords: [-34.6037, -58.3816], url: 'cities/buenos-aires.html' },
    { name: 'Madrid', coords: [40.4168, -3.7038], url: '#' },
    { name: 'Melbourne', coords: [-37.8136, 144.9631], url: '#' },
    { name: 'Nairobi', coords: [-1.2864, 36.8172], url: '#' },
    { name: 'New Delhi', coords: [28.6139, 77.2090], url: '#' }
];

// Agregar marcadores
cities.forEach(city => {
    const marker = L.circleMarker(city.coords, {
        radius: 8,
        fillColor: '#000080',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);
    
    marker.bindPopup(`<strong>${city.name}</strong>`);
    
    marker.on('click', function() {
        if (city.url !== '#') {
            window.location.href = city.url;
        }
    });
});
