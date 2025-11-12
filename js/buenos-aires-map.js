/**
 * HEATED CITY - Buenos Aires
 * Mapa de barrios y navegación
 */

// Inicializar mapa centrado en Buenos Aires
const map = L.map('map').setView([-34.6037, -58.3816], 12);

// Agregar tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Datos de barrios
const neighborhoods = [
    { 
        name: 'San Telmo', 
        coords: [-34.6215, -58.3724],
        number: 1,
        active: true,
        url: 'san-telmo.html'
    },
    { 
        name: 'Palermo', 
        coords: [-34.5886, -58.4195],
        number: 2,
        active: false
    },
    { 
        name: 'Chacarita', 
        coords: [-34.5878, -58.4548],
        number: 3,
        active: false
    },
    { 
        name: 'Recoleta', 
        coords: [-34.5889, -58.3931],
        number: 4,
        active: false
    },
    { 
        name: 'La Boca', 
        coords: [-34.6345, -58.3632],
        number: 5,
        active: false
    },
    { 
        name: 'Puerto Madero', 
        coords: [-34.6118, -58.3636],
        number: 6,
        active: false
    }
];

// Crear marcadores numerados para cada barrio
neighborhoods.forEach(neighborhood => {
    // Crear div para marcador numerado
    const markerDiv = document.createElement('div');
    markerDiv.className = 'numbered-marker';
    markerDiv.textContent = neighborhood.number;
    markerDiv.style.background = neighborhood.active ? '#000080' : '#999';
    
    // Crear icono personalizado
    const customIcon = L.divIcon({
        html: markerDiv.outerHTML,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    
    // Crear marcador
    const marker = L.marker(neighborhood.coords, { icon: customIcon }).addTo(map);
    
    // Popup con nombre del barrio
    marker.bindPopup(`<strong>${neighborhood.name}</strong>${neighborhood.active ? '' : '<br><small>Coming Soon</small>'}`);
    
    // Click en marcador
    marker.on('click', () => {
        if (neighborhood.active && neighborhood.url) {
            window.location.href = neighborhood.url;
        }
    });
});

// Funcionalidad para las tarjetas de barrios
document.addEventListener('DOMContentLoaded', function() {
    const neighborhoodCards = document.querySelectorAll('.neighborhood-city-card');
    
    neighborhoodCards.forEach(card => {
        card.addEventListener('click', function() {
            // Solo permitir click en San Telmo
            if (this.dataset.neighborhood === 'san-telmo') {
                window.location.href = 'san-telmo.html';
            } else if (this.classList.contains('coming-soon-card')) {
                // Opcional: mostrar mensaje
                console.log('Coming soon!');
            }
        });
        
        // Cambiar cursor solo para San Telmo
        if (card.dataset.neighborhood === 'san-telmo') {
            card.style.cursor = 'pointer';
        } else {
            card.style.cursor = 'default';
        }
    });
});
