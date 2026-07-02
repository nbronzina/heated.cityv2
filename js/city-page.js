/**
 * HEATED CITY - City page engine
 * Renders the map, project cards, category filtering and the project
 * modal from the CITY_DATA object defined in js/data/<city>-data.js.
 * Load the data file before this script.
 */

// ======================================
// MAP
// ======================================
const map = L.map('map').setView(CITY_DATA.center, CITY_DATA.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

const markers = {};

CITY_DATA.projects.forEach(project => {
    const icon = L.divIcon({
        className: '',
        html: `<div class="numbered-marker">${project.number}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    const marker = L.marker(project.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${project.title}</strong><br>${project.location}`)
        .on('click', () => openProjectModal(project.id));

    markers[project.id] = marker;
});

// ======================================
// PROJECT CARDS (generated from CITY_DATA)
// ======================================
const projectsGrid = document.getElementById('projectsGrid');

CITY_DATA.projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = project.categories;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open project: ${project.title}`);
    card.innerHTML = `
        <div class="project-number">${project.number}</div>
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
        </div>
    `;
    card.addEventListener('click', () => openProjectModal(project.id));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(project.id);
        }
    });
    projectsGrid.appendChild(card);
});

// ======================================
// PROJECT MODAL
// ======================================
function openProjectModal(projectId) {
    const project = CITY_DATA.projects.find(p => p.id === projectId);
    const modal = document.getElementById('projectModal');
    if (!project || !modal) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalLocationText').textContent = project.location;
    document.getElementById('modalLocation').href =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`;
    document.getElementById('modalDescription').textContent = project.description;

    const modalImage = document.getElementById('modalImage');
    modalImage.src = project.image;
    modalImage.alt = project.title;

    // Only show the website link when the project has a real site
    const websiteLink = document.getElementById('modalWebsite');
    if (project.website && project.website !== '#') {
        websiteLink.href = project.website;
        websiteLink.style.display = '';
    } else {
        websiteLink.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    map.setView(project.coords, 16);
    markers[projectId].openPopup();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ======================================
// CATEGORY FILTERING
// ======================================
const categoryIcons = document.querySelectorAll('.category-icon');

categoryIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        categoryIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.category;
        document.querySelectorAll('.project-card').forEach(card => {
            const show = category === 'all' || card.dataset.category.split(' ').includes(category);
            card.style.display = show ? 'block' : 'none';
        });
    });
});

// ======================================
// CLOSE MODAL - ESC key and outside click
// ======================================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
});

document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) closeProjectModal();
});
