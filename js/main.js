/**
 * HEATED CITY - Main JavaScript
 * For index.html
 */

// Districts shown on the hero world map
const HERO_DISTRICTS = [
    { name: 'San Telmo',   coords: [-34.6215, -58.3724], url: 'cities/san-telmo.html' },
    { name: 'Higashiyama', coords: [35.0116, 135.7681],  url: 'cities/kyoto.html' },
    { name: 'Lavapiés',    coords: [40.4168, -3.7038] },
    { name: 'Carlton',     coords: [-37.8136, 144.9631] },
    { name: 'Kibera',      coords: [-1.2864, 36.8172] },
    { name: 'Hauz Khas',   coords: [28.6139, 77.2090] }
];

document.addEventListener('DOMContentLoaded', function() {

    // ======================================
    // HERO - World map of districts
    // ======================================
    const heroMapEl = document.getElementById('heroMap');
    if (heroMapEl && typeof L !== 'undefined') {
        const heroMap = L.map('heroMap', {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([18, 10], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(heroMap);

        HERO_DISTRICTS.forEach(d => {
            const pill = L.divIcon({
                className: '',
                html: `<span class="city-pill${d.url ? '' : ' soon'}">${d.name}</span>`,
                iconSize: null
            });
            const marker = L.marker(d.coords, { icon: pill }).addTo(heroMap);
            if (d.url) {
                marker.on('click', () => { window.location.href = d.url; });
            } else {
                marker.bindPopup(`<strong>${d.name}</strong><br><small>Coming soon</small>`);
            }
        });

        // The intro panel collapses to a chip so the map can be explored
        // full-width: on the close button, or as soon as the map is used.
        const panel = document.getElementById('heroPanel');
        const chip = document.getElementById('heroPanelChip');

        function collapsePanel() {
            panel.classList.add('hidden');
            chip.classList.remove('hidden');
        }

        document.getElementById('heroPanelClose').addEventListener('click', collapsePanel);
        heroMap.on('dragstart zoomstart', collapsePanel);

        chip.addEventListener('click', () => {
            panel.classList.remove('hidden');
            chip.classList.add('hidden');
        });
    }

    // ======================================
    // CTA BUTTON - Smooth scroll
    // ======================================
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const neighborhoodsSection = document.querySelector('.neighborhoods-section');
            if (neighborhoodsSection) {
                neighborhoodsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ======================================
    // CITIES SECTION - Filter by region
    // ======================================
    const cityTabs = document.querySelectorAll('.city-tab');
    const cityCards = document.querySelectorAll('.city-card');

    cityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            cityTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const selectedRegion = this.getAttribute('data-region');

            cityCards.forEach(card => {
                const cardRegion = card.getAttribute('data-region');
                card.style.display = (selectedRegion === 'all' || cardRegion === selectedRegion) ? 'flex' : 'none';
            });
        });
    });

    // ======================================
    // SMOOTH SCROLL for internal links
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
