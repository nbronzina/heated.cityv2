/**
 * CITIES THAT CARE - Contributors
 * Single source of truth for the coordinators: renders the world map
 * (portrait markers) and the contributor cards on contributors.html.
 */

const CONTRIBUTORS = [
    {
        name: 'Himari Satō',
        district: 'Higashiyama',
        city: 'Kyoto, Japan',
        coords: [35.0116, 135.7681],
        portrait: 'img/people/himari-sato.webp',
        url: 'cities/kyoto.html',
        color: '#FFE082'
    },
    {
        name: 'María Fernández',
        district: 'San Telmo',
        city: 'Buenos Aires, Argentina',
        coords: [-34.6037, -58.3816],
        portrait: 'img/people/maria-fernandez.webp',
        url: 'cities/san-telmo.html',
        color: '#CE93D8'
    },
    {
        name: 'Priya Sharma',
        district: 'Hauz Khas',
        city: 'New Delhi, India',
        coords: [28.6139, 77.2090],
        portrait: 'img/people/priya-sharma.webp',
        color: '#FFB74D'
    },
    {
        name: 'Ana García',
        district: 'Lavapiés',
        city: 'Madrid, Spain',
        coords: [40.4168, -3.7038],
        portrait: 'img/people/ana-garcia.webp',
        color: '#F48FB1'
    },
    {
        name: 'Sarah Chen',
        district: 'Carlton',
        city: 'Melbourne, Australia',
        coords: [-37.8136, 144.9631],
        portrait: 'img/people/sarah-chen.webp',
        color: '#80CBC4'
    },
    {
        name: 'James Kamau',
        district: 'Kibera',
        city: 'Nairobi, Kenya',
        coords: [-1.2864, 36.8172],
        portrait: 'img/people/james-kamau.webp',
        color: '#AED581'
    }
];

// ======================================
// MAP - one world, portrait markers
// ======================================
const map = L.map('contributorsMap', {
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    maxBounds: [[-85, -200], [85, 200]],
    maxBoundsViscosity: 1.0
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    noWrap: true,
    bounds: [[-90, -180], [90, 180]]
}).addTo(map);

// Cover the container with one world: no gray bands around the map
const mapSize = map.getSize();
const coverZoom = Math.ceil(Math.log2(Math.max(mapSize.x, mapSize.y) / 256) * 4) / 4;
map.setMinZoom(coverZoom);
map.setView([15, 10], coverZoom);

CONTRIBUTORS.forEach(c => {
    const icon = L.divIcon({
        className: '',
        html: `<div class="avatar-marker${c.url ? '' : ' soon'}">
                   <img src="${c.portrait}" alt="${c.name}">
               </div>`,
        iconSize: [56, 56],
        iconAnchor: [28, 28]
    });

    const marker = L.marker(c.coords, { icon }).addTo(map)
        .bindPopup(`<strong>${c.name}</strong><br>${c.district}, ${c.city}${c.url ? '' : '<br><small>Coming soon</small>'}`);

    if (c.url) {
        marker.on('click', () => { window.location.href = c.url; });
    }
});

// ======================================
// CONTRIBUTOR CARDS
// ======================================
const grid = document.getElementById('contributorsGrid');

CONTRIBUTORS.forEach(c => {
    const card = document.createElement(c.url ? 'a' : 'article');
    card.className = `contributor-card${c.url ? '' : ' coming-soon'}`;
    if (c.url) card.href = c.url;
    card.style.background = c.color;

    card.innerHTML = `
        <img class="contributor-portrait" src="${c.portrait}" alt="Portrait of ${c.name}" loading="lazy">
        <div class="contributor-info">
            <h2 class="contributor-name">${c.name}</h2>
            <p class="contributor-role">Coordinator of ${c.district}</p>
            <p class="contributor-place">${c.city}</p>
            ${c.url ? '' : '<span class="coming-soon-badge">COMING SOON</span>'}
        </div>
    `;
    grid.appendChild(card);
});

// Open invitation card at the end of the grid
const joinCard = document.createElement('a');
joinCard.className = 'contributor-card join-card';
joinCard.href = 'contribute.html';
joinCard.innerHTML = `
    <div class="join-card-plus" aria-hidden="true">+</div>
    <div class="contributor-info">
        <h2 class="contributor-name">Your district could be next</h2>
        <p class="contributor-role">The network is looking for coordinators</p>
        <p class="contributor-place">Join →</p>
    </div>
`;
grid.appendChild(joinCard);
