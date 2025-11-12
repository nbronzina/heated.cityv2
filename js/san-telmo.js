/**
 * HEATED CITY - San Telmo (Buenos Aires)
 * Mapa y funcionalidad de proyectos
 */

// Inicializar mapa centrado en San Telmo
const map = L.map('map').setView([-34.6215, -58.3724], 16);

// Agregar tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Datos de proyectos
const projects = {
    'mercado-san-telmo': {
        title: 'San Telmo Market',
        location: 'Defensa 963, San Telmo',
        website: 'https://www.futures-in-maps.com/san-telmo/',
        image: 'https://www.futures-in-maps.com/san-telmo/images/san-telmo-map-wall.jpg',
        description: 'Built in 1897 and fully restored in 2028, San Telmo Market remains a vibrant shopping destination offering fresh summer environments and a wide range of products. The market embodies the richness and diversity of gastronomic possibilities, from specialty coffee and artisan bread to seasonal fruits and vegetables. It features a herboristería treasured by herbology enthusiasts, explores sustainable protein sources, and offers a paradise for history enthusiasts and technology aficionados with its collection of antiques and tech items.',
        coords: [-34.6214, -58.3725]
    },
    'refugios-termicos': {
        title: 'Historic Thermal Refuges',
        location: 'Casa de los Ezeiza, Defensa 1179, San Telmo',
        website: '#',
        image: 'https://www.futures-in-maps.com/san-telmo/images/san-telmo-map-wall.jpg',
        description: 'A network of historic 19th-century buildings functions as thermal refuges during heat waves. These colonial structures and conventillos use their thick walls (60-80cm), arched galleries, and deep patios to maintain temperatures 5-8°C cooler than outside. During extreme heat days, spaces open to the public with water fountains, shade, and basic health monitoring for vulnerable neighbors. Casa Ezeiza, San Pedro Telmo Church (Carlos Calvo 242), and the ex-conventillo at Balcarce 1016 form the main nodes of this network coordinated by neighborhood centers.',
        coords: [-34.6216, -58.3728]
    },
    'cisterna-historica': {
        title: 'Historic Community Cistern',
        location: 'El Zanjón de Granados, Defensa 755, San Telmo',
        website: '#',
        image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/zanjon1500x610-20210414.jpg',
        description: 'The network of colonial tunnels and 18th-century cisterns beneath El Zanjón de Granados has been reactivated as a rainwater collection and storage system. The main 18,000-liter cistern receives water from 23 neighborhood rooftops through restored gutters. Stored water is used for irrigating community gardens, public space nebulizers, and drought reserves. Guided tours show the neighborhood\'s water archaeology and explain how 1700s Spanish infrastructure integrates with current level sensors and solar pumps. Additional cisterns are at Pasaje Giuffra 371 and Humberto Primo 340.',
        coords: [-34.6207, -58.3722]
    },
    'calles-frescas': {
        title: 'Cool Cobblestone Streets',
        location: 'Calle Defensa (Av. Belgrano - Av. San Juan), San Telmo',
        website: '#',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Calles_Empedradas_De_San_Telmo_Paved_Streets_%28210459027%29.jpeg/1024px-Calles_Empedradas_De_San_Telmo_Paved_Streets_%28210459027%29.jpeg',
        description: 'The Defensa Street pedestrian corridor preserves its historic granite cobblestones, whose surface reflects more light and allows water infiltration, reducing ground temperature by 15°C compared to asphalt. Between 2026-2030, 47 plane trees were planted that now form a continuous canopy, generating 85% shade on sidewalks. Every 100 meters there are benches with green backrests, public water fountains, and planters with native species. Trees are irrigated with cistern water through underground drip systems. Sidewalks were replaced with porous tiles that absorb rain. The combined effect creates a microclimate 6°C cooler than adjacent streets, especially noticeable between 2-6pm.',
        coords: [-34.6210, -58.3724]
    },
    'plaza-dorrego': {
        title: 'Dorrego Park',
        location: 'Dorrego Park (Humberto Primo y Defensa), San Telmo',
        website: '#',
        image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/feria_de_san_telmo_1200_plaza_1.jpg',
        description: 'Buenos Aires\' oldest plaza after Plaza de Mayo has been transformed into a multi-use adaptive space. Sundays maintain the historic antiques fair, but now under deployable textile shade structures and stalls with modular vertical gardens. The restored central fountain (which existed until 1960) functions in three modes by temperature: ornamental, with perimeter nebulization, or intense water curtain. The ground preserves original cobblestones with widened joints to absorb 80% of rainwater. 23 native trees (tipas, ceibos, lapachos) were planted complementing the existing 24, achieving 70% coverage. A 2-meter perimeter rain garden manages water excess. On heat wave days, the plaza becomes a community refuge.',
        coords: [-34.6218, -58.3726]
    },
    'patios-huerta': {
        title: 'Shared Courtyard-Garden Network',
        location: 'Nodo Bolivar 958, San Telmo (red distribuida)',
        website: '#',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/353965255.jpg?k=a156d0cd83f21e4305b57339e3ceef7dc6574fe407258d92a3aba210e2de7339&o=',
        description: 'A network of 34 patios in historic conventillos and buildings has transformed into community urban gardens. The Bolivar 958 patio functions as coordination and training hub, producing monthly 340kg of vegetables, 45kg of herbs, and 78kg of fruits distributed among neighbors, community kitchens, and exchange with other networks. Patios maintain their original architecture (galleries, iron columns, limestone floors) but add raised beds, vertical gardens on railings, composters, and irrigation systems connected to historic cisterns. Eight patios in the block between Defensa and Bolivar are connected by shared gates that open during heat waves creating fresh air currents. Other active nodes: Defensa 1179, Pasaje San Lorenzo 380, Balcarce 1053.',
        coords: [-34.6220, -58.3735]
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
