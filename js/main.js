/**
 * CITIES THAT CARE - Main JavaScript
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
            zoomControl: true,
            zoomSnap: 0.25,
            // One world only: no horizontal repetition, panning clamped
            maxBounds: [[-85, -200], [85, 200]],
            maxBoundsViscosity: 1.0
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            noWrap: true,
            bounds: [[-90, -180], [90, 180]]
        }).addTo(heroMap);

        // Cover the container with exactly one world: the map fills the
        // hero with no gray bands and every continent in view.
        const heroSize = heroMap.getSize();
        const heroCoverZoom = Math.ceil(Math.log2(Math.max(heroSize.x, heroSize.y) / 256) * 4) / 4;
        heroMap.setMinZoom(heroCoverZoom);
        heroMap.setView([30, 0], heroCoverZoom);
        window.heroMapRef = heroMap;

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
