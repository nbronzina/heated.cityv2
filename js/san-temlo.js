/**
 * HEATED CITY - San Telmo (Buenos Aires)
 * Mapa y funcionalidad de proyectos
 */

// Inicializar mapa centrado en San Telmo
const map = L.map('map').setView([-34.6215, -58.3724], 15);

// Agregar tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Datos de proyectos
const projects = {
    'mercado-san-telmo': {
        title: 'Mercado San Telmo',
        location: 'Defensa 963, San Telmo',
        website: 'https://www.futures-in-maps.com/san-telmo/',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        description: 'The historic San Telmo Market has been transformed into a community thermal refuge and food coordination center. Its cast-iron structure now houses cooling systems, rainwater collection, and community kitchens that serve as a model for heritage-based climate adaptation throughout Buenos Aires.',
        coords: [-34.6215, -58.3724]
    },
    'refugio-termico': {
        title: 'Refugios Térmicos Históricos',
        location: 'Multiple locations, San Telmo',
        website: '#',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
        description: 'A network of historic buildings converted into neighborhood thermal refuges during extreme heat events. These 19th-century structures use their thick walls and high ceilings to maintain cooler temperatures, serving as emergency cooling centers for residents.',
        coords: [-34.6220, -58.3735]
    },
    'patios-colectivos': {
        title: 'Patios Colectivos Verdes',
        location: 'Various addresses, San Telmo',
        website: '#',
        image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800',
        description: 'Traditional interior patios of conventillos (tenement houses) have been transformed into shared green spaces. These collective gardens provide cooling, food production, and stormwater management while maintaining the neighborhood\'s architectural character.',
        coords: [-34.6225, -58.3715]
    },
    'cisterna-historica': {
        title: 'Cisterna Histórica Comunitaria',
        location: 'Plaza Dorrego area',
        website: '#',
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800',
        description: 'Colonial-era cisterns beneath San Telmo have been restored and integrated into a community water management system. These underground reservoirs collect rainwater and provide emergency water storage during drought periods.',
        coords: [-34.6210, -58.3728]
    },
    'azoteas-verdes': {
        title: 'Red de Azoteas Verdes',
        location: 'Rooftops throughout San Telmo',
        website: '#',
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
        description: 'A coordinated network of green roofs across San Telmo\'s low-rise buildings creates an elevated ecosystem. These rooftop gardens reduce heat island effects, manage stormwater, and provide community growing spaces accessible from fire escapes and terraces.',
        coords: [-34.6230, -58.3720]
    },
    'calles-frescas': {
        title: 'Calles Frescas de Adoquín',
        location: 'Cobblestone streets, San Telmo',
        website: '#',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
        description: 'San Telmo\'s historic cobblestone streets have been enhanced with permeable materials and strategic tree planting to reduce surface temperatures. The cooling corridors connect thermal refuges and community spaces throughout the neighborhood.',
        coords: [-34.6218, -58.3732]
    }
};

// Crear marcadores numerados
let markers = [];
let markerIndex = 1;

Object.keys(projects).forEach(projectId => {
    const project = projects[projectId];
    
    // Crear div para marcador numerado
    const markerDiv = document.createElement('div');
    markerDiv.className = 'numbered-marker';
    markerDiv.textContent = markerIndex;
    
    // Crear icono personalizado
    const customIcon = L.divIcon({
        html: markerDiv.outerHTML,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    
    // Crear marcador
    const marker = L.marker(project.coords, { icon: customIcon }).addTo(map);
    
    // Click en marcador abre modal
    marker.on('click', () => {
        openProjectModal(projectId);
    });
    
    markers.push({ id: projectId, marker: marker });
    markerIndex++;
});

// Abrir modal de proyecto
function openProjectModal(projectId) {
    const project = projects[projectId];
    const modal = document.getElementById('projectModal');
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalLocationText').textContent = project.location;
    document.getElementById('modalLocation').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`;
    document.getElementById('modalWebsite').href = project.website;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalImage').src = project.image;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Cerrar modal al hacer click fuera
document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectModal();
    }
});

// Filtrado por categorías
const categoryIcons = document.querySelectorAll('.category-icon');
const projectCards = document.querySelectorAll('.project-card');

categoryIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Actualizar iconos activos
        categoryIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Filtrar proyectos
        projectCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategories = card.dataset.category.split(' ');
                if (cardCategories.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});
