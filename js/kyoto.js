/**
 * HEATED CITY - Kyoto Page JavaScript (IMPROVED)
 * For cities/kyoto.html
 */

// Project data for Kyoto with coordinates
const projectsData = {
    'hikari-machiya': {
        title: 'Hikari Machiya Community Workshop',
        location: 'Higashiyama-ku, Kyoto',
        coordinates: [34.9965, 135.7799],
        locationLink: 'https://maps.google.com/?q=Higashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
        description: 'The converted machiya where Himari Satō first observed the Yamamoto family\'s fifteen-minute-early arrivals that led to the "soft arrival periods" innovation. Traditional papermaking workshops integrate with biointegration system calibration, creating spaces where craft, community gathering, and atmospheric coordination naturally overlap.',
        number: 1
    },
    'bamboo-grove': {
        title: 'Bamboo Grove Acoustic Monitors',
        location: 'Arashiyama, Kyoto',
        coordinates: [35.0094, 135.6700],
        locationLink: 'https://maps.google.com/?q=Arashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1542208776-f2d90e5c9087?w=800',
        description: 'Acoustic monitoring systems embedded in bamboo groves connect traditional seasonal observation practices with neighborhood atmospheric processing schedules. The rustling bamboo sounds inform system calibrations, creating feedback loops between natural phenomena and urban infrastructure.',
        number: 2
    },
    'mineral-pools': {
        title: 'Seasonal Mineral Pools',
        location: 'Higashiyama District',
        coordinates: [35.0012, 135.7783],
        locationLink: 'https://maps.google.com/?q=Higashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800',
        description: 'Temperature-responsive mineral pools where grandmother Kimiko\'s arthritic joints found relief during morning visits. The three-week mineral cycling patterns became templates for atmospheric system optimization, demonstrating how individual care needs inform collective infrastructure.',
        number: 3
    },
    'machiya-integration': {
        title: 'Machiya Infrastructure Integration',
        location: 'Historic Higashiyama',
        coordinates: [34.9988, 135.7826],
        locationLink: 'https://maps.google.com/?q=Higashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800',
        description: 'Traditional wooden machiya buildings retrofitted with biointegration systems that respect architectural heritage while enabling atmospheric coordination. Split-unit air conditioning discretely mounted on traditional facades, PVC utility conduits following wood beam structures.',
        number: 4
    },
    'atmospheric-gardens': {
        title: 'Atmospheric Processing Gardens',
        location: 'Throughout Higashiyama',
        coordinates: [34.9942, 135.7752],
        locationLink: 'https://maps.google.com/?q=Higashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1519408299519-b52e315a47e0?w=800',
        description: 'Distributed garden spaces where atmospheric processing occurs through biointegrated plant systems. Seasonal patterns of growth and dormancy inform neighborhood climate coordination, making infrastructure visible through living systems.',
        number: 5
    },
    'coordination-centers': {
        title: 'Community Coordination Centers',
        location: 'Multiple Locations',
        coordinates: [35.0022, 135.7812],
        locationLink: 'https://maps.google.com/?q=Higashiyama+Kyoto',
        website: '#',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
        description: 'Weekly Wednesday gathering spaces where Himari Satō developed community dialogue methods for discussing environmental preferences and system adjustments. These coordination protocols became standard practice in 23 districts worldwide.',
        number: 6
    }
};

// Initialize map
let map;
let markers = [];

function initMap() {
    // Center coordinates for Higashiyama
    const centerCoords = [34.9985, 135.7780];
    
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
