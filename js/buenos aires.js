/**
 * HEATED CITY - Buenos Aires Page JavaScript
 * For cities/buenos-aires.html
 */

// Project data for Buenos Aires
const projectsData = {
    'plaza-seca': {
        title: 'Plaza Seca de Balvanera',
        location: 'Av. Corrientes 3247',
        locationLink: 'https://maps.google.com/?q=Av.+Corrientes+3247+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        description: 'A pilot project that transforms traditional plazas into rainwater management systems, acting as urban sponges during floods and cooling spaces during heat waves. The design combines green infrastructure with permeable pavements and native rain gardens.'
    },
    'refugio-termico': {
        title: 'Refugio Térmico del Abasto',
        location: 'Mercado del Abasto',
        locationLink: 'https://maps.google.com/?q=Mercado+del+Abasto+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
        description: 'The old Abasto Market is converted into a community climate refuge during extreme heat waves. With passive cooling systems, green roofs and adapted social spaces, it offers respite to vulnerable residents.'
    },
    'edificios-anfibios': {
        title: 'Edificios Anfibios de Balvanera',
        location: 'Balvanera Sur',
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        description: 'Architectural prototypes of housing buildings that can elevate during extreme floods. Using flotation technology and adaptive foundations, these buildings reimagine how to live with water rather than fight against it.'
    },
    'corredores-verdes': {
        title: 'Corredores Verdes Conectados',
        location: 'Todo Balvanera',
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
        description: 'An interconnected network of green streets that reduces urban temperature by up to 5°C and manages runoff. The corridors combine active mobility, native biodiversity and stormwater management.'
    },
    'barrio-esponja': {
        title: 'Balvanera: Barrio Esponja',
        location: 'Todo el barrio',
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        description: 'A vision of Balvanera transformed into a complete "sponge neighborhood" where every surface - from streets to roofs - absorbs, stores and filters water. Historic buildings integrate living facades and micro-habitats.'
    },
    'techos-verdes': {
        title: 'Techos Verdes Colectivos',
        location: 'Multiple locations',
        locationLink: 'https://maps.google.com/?q=Balvanera+Buenos+Aires',
        website: '#',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        description: 'Community-managed green roofs that reduce heat island effect, manage stormwater, and create urban agriculture spaces. Residents share harvests and maintenance duties, building neighborhood bonds through collective care.'
    }
};

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
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
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
