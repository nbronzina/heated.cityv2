/**
 * CITIES THAT CARE - City page engine (scrollytelling)
 * Renders the map and the project story sections from the CITY_DATA
 * object defined in js/data/<city>-data.js. As the reader scrolls
 * through a project, the map flies to its marker; clicking a marker
 * scrolls to its section. Load the data file before this script.
 */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        html: `<div class="numbered-marker" data-project="${project.id}">${project.number}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    const marker = L.marker(project.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${project.title}</strong><br>${project.location}`)
        .on('click', () => {
            const section = document.getElementById(`project-${project.id}`);
            if (section) {
                section.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
            }
        });

    markers[project.id] = marker;
});

// ======================================
// PROJECT STORY SECTIONS (generated from CITY_DATA)
// ======================================
const storyContainer = document.getElementById('projectsGrid');

CITY_DATA.projects.forEach(project => {
    const section = document.createElement('section');
    section.className = 'project-section';
    section.id = `project-${project.id}`;
    section.dataset.project = project.id;
    section.dataset.category = project.categories;

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`;
    const websiteLink = (project.website && project.website !== '#')
        ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer">Visit website</a>`
        : '';

    section.innerHTML = `
        <div class="project-eyebrow">
            <span class="project-index">${project.number}</span>
            <span>${project.location}</span>
        </div>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <p class="project-text">${project.description}</p>
        <div class="project-links">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">View on map</a>
            ${websiteLink}
        </div>
    `;
    storyContainer.appendChild(section);
});

// ======================================
// SCROLL → MAP SYNC
// ======================================
let activeId = null;

function activateProject(projectId) {
    if (projectId === activeId) return;
    activeId = projectId;

    const project = CITY_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    document.querySelectorAll('.numbered-marker.active').forEach(m => m.classList.remove('active'));
    const markerEl = document.querySelector(`.numbered-marker[data-project="${projectId}"]`);
    if (markerEl) markerEl.classList.add('active');

    if (REDUCED_MOTION) {
        map.setView(project.coords, 16);
    } else {
        map.flyTo(project.coords, 16, { duration: 1.2 });
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateProject(entry.target.dataset.project);
        }
    });
}, {
    // A section becomes active when it crosses the middle band of the viewport
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
});

document.querySelectorAll('.project-section').forEach(s => observer.observe(s));

// ======================================
// CATEGORY FILTERING
// ======================================
const categoryIcons = document.querySelectorAll('.category-icon');

categoryIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        categoryIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.category;
        document.querySelectorAll('.project-section').forEach(section => {
            const show = category === 'all' || section.dataset.category.split(' ').includes(category);
            section.style.display = show ? 'block' : 'none';
        });
    });
});
