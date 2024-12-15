// Asegúrate de que este código se ejecuta después de que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el mapa
    const map = L.map('map').setView([35.0116, 135.7681], 12);

    // Agrega la capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define las ubicaciones
    const locations = [
        { id: 1, name: "Hikari Machiya Studio (光町家スタジオ)", coords: [35.0035, 135.7780] },
        { id: 2, name: "Akari no Michi (明かりの道)", coords: [35.0045, 135.7795] },
        { id: 3, name: "Katzura Eco-Island Center (保津川エコアイランドセンター)", coords: [35.0129, 135.6778] },
        { id: 4, name: "Bamboo Grove Knowledge Trail (竹林知識トレイル)", coords: [35.0168, 135.6713] },
        { id: 5, name: "Kura no Megumi (倉の恵み)", coords: [34.9305, 135.7630] },
        { id: 6, name: "Midori no Kura (緑の蔵)", coords: [34.9310, 135.7645] },
    ];

    // Función para crear íconos personalizados
    const createCustomIcon = (id) => L.divIcon({
        className: 'custom-marker',
        html: `
            <div 
                style="
                    width: 30px; 
                    height: 30px; 
                    background-color: #f4a261; 
                    border-radius: 50%; 
                    border: 2px solid white; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white; 
                    font-weight: bold;">
                ${id}
            </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15], // Centra el ícono
    });

    // Agrega los marcadores al mapa
    locations.forEach((location) => {
        L.marker(location.coords, { icon: createCustomIcon(location.id) })
            .addTo(map)
            .bindPopup(`<b>${location.id}. ${location.name}</b>`);
    });
});

function toggleReadMore(element) {
    // Cierra cualquier tarjeta abierta
    document.querySelectorAll('.contributor p').forEach(p => {
        p.style.maxHeight = '3.6em';
    });
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.textContent = 'Read More';
    });

    // Abre la tarjeta seleccionada
    const parentCard = element.closest('.contributor');
    const paragraph = parentCard.querySelector('p');

    if (element.textContent === 'Read More') {
        paragraph.style.maxHeight = 'none';
        element.textContent = 'Read Less';
    } else {
        paragraph.style.maxHeight = '3.6em';
        element.textContent = 'Read More';
    }
}
