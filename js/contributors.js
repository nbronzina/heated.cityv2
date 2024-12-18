document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById('map');

    if (mapElement) {
        const map = L.map(mapElement).setView([20, 0], 2);

        // Capa base del mapa
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Define un ícono personalizado para los marcadores
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 24px; height: 24px; background-color: #f4a261; 
                    border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        // Lista de contribuyentes
        const contributors = [
            { name: "Pablo Sanguinetti", location: [-34.6037, -58.3816], description: "Buenos Aires" },
            { name: "Ana García", location: [40.4168, -3.7038], description: "Madrid" },
            { name: "Callagun Smith", location: [-37.8136, 144.9631], description: "Melbourne" },
            { name: "Kamau Mwangi", location: [-1.2921, 36.8219], description: "Nairobi" },
            { name: "Priya Sharma", location: [28.6139, 77.2090], description: "New Delhi" },
            { name: "Himari Satō", location: [35.0116, 135.7681], description: "Kyoto" }
        ];

        // Array para almacenar las coordenadas de los puntos
        const bounds = [];

        // Añadir los marcadores al mapa
        contributors.forEach(contributor => {
            L.marker(contributor.location, { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>${contributor.name}</b><br>${contributor.description}`);

            // Añade las coordenadas al array para ajustarlas después
            bounds.push(contributor.location);
        });

        // Ajusta el mapa para mostrar todos los puntos dentro del área visible
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
});
