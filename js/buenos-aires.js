/**
 * HEATED CITY - Buenos Aires Page JavaScript (IMPROVED)
 * For cities/buenos-aires.html
 */

// Project data for Buenos Aires with coordinates
const projectsData = {
    'plaza-seca': {
        title: 'Plaza Seca de Balvanera',
        location: 'Av. Corrientes 3247',
        coordinates: [-34.6096, -58.4119],
        locationLink: 'https://maps.google.com/?q=Av.+Corrientes+3247+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        description: 'A pilot project that transforms traditional plazas into rainwater management systems, acting as urban sponges during floods and cooling spaces during heat waves. The design combines green infrastructure with permeable pavements and native rain gardens.',
        number: 1
    },
    'refugio-termico': {
        title: 'Refugio Térmico del Abasto',
        location: 'Mercado del Abasto',
        coordinates: [-34.6035, -58.4109],
        locationLink: 'https://maps.google.com/?q=Mercado+del+Abasto+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
        description: 'The old Abasto Market is converted into a community climate refuge during extreme heat waves. With passive cooling systems, green roofs and adapted social spaces, it offers respite to vulnerable residents.',
        number: 2
    },
    'edificios-anfibios': {
        title: 'Edificios Anfibios de Balvanera',
        location: 'Balvanera Sur',
        coordinates: [-34.6138, -58.4089],
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        description: 'Architectural prototypes of housing buildings that can elevate during extreme floods. Using flotation technology and adaptive foundations, these buildings reimagine how to live with water rather than fight against it.',
        number: 3
    },
    'corredores-verdes': {
        title: 'Corredores Verdes Conectados',
        location: 'Todo Balvanera',
        coordinates: [-34.6065, -58.4052],
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
        description: 'An interconnected network of green streets that reduces urban temperature by up to 5°C and manages runoff. The corridors combine active mobility, native biodiversity and stormwater management.',
        number: 4
    },
    'barrio-esponja': {
        title: 'Balvanera: Barrio Esponja',
        location: 'Todo el barrio',
        coordinates: [-34.6088, -58.4142],
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        description: 'A vision of Balvanera transformed into a complete "sponge neighborhood" where every surface - from streets to roofs - absorbs, stores and filters water. Historic buildings integrate living facades and micro-habitats.',
        number: 5
    },
    'techos-verdes': {
        title: 'Techos Verdes Colectivos',
        location: 'Multiple locations',
        coordinates: [-34.6052, -58.4165],
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        description: 'Community-managed green roofs that reduce heat island effect, manage stormwater, and create urban agriculture spaces. Residents share harvests and maintenance duties, building neighborhood bonds through collective care.',
        number: 6
    }
};

// Initialize map
let map;
let markers = [];

function initMap() {
    // Center coordinates for Balvanera
    const centerCoords = [-34.6088, -58.4116];
    
    // Create map
    map = L.map('map').setView(centerCoords, 14);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add numbered markers for each project
    Object.keys(projectsData).forEach(projectId => {
        const project = projectsData[projectId];
        
        // Create custom numbered marker
        const markerIcon = L.divIcon({
            className: 'numbered-marker',
            html: `<div>${project.number}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        // Create marker
        const marker = L.marker(project.coordinates, { icon: markerIcon })
            .addTo(map)
            .bindPopup(`<strong>${project.title}</strong><br>${project.location}`)
            .on('click', function() {
                openProjectModal(projectId);
            });
        
        markers.push(marker);
    });
}

// Modal functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectId];
    
    if (project && modal) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalLocationText').textContent = project.location;
        document.getElementById('modalLocation').href = project.locationLink;
        document.getElementById('modalWebsite').href = project.website;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalDescription').textContent = project.description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Highlight marker on map
        highlightMarker(project.number);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function highlightMarker(number) {
    // Pan map to the marker
    const projectId = Object.keys(projectsData).find(id => projectsData[id].number === number);
    if (projectId) {
        const coords = projectsData[projectId].coordinates;
        map.setView(coords, 16);
        
        // Open popup temporarily
        markers[number - 1].openPopup();
        
        // Close popup after 2 seconds
        setTimeout(() => {
            markers[number - 1].closePopup();
        }, 2000);
    }
}

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initMap();
    
    const categoryIcons = document.querySelectorAll('.category-icon');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryIcons.forEach(ic => ic.classList.remove('active'));
            this.classList.add('active');
            
            projectCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category');
                    card.style.display = categories.includes(category) ? 'block' : 'none';
                }
            });
        });
    });
});

// Close modal on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});
