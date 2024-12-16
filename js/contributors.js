document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    const contributors = [
        { name: "Pablo Sanguinetti", location: [-34.6037, -58.3816], description: "Buenos Aires" },
        { name: "Ana García", location: [40.4168, -3.7038], description: "Madrid" },
        { name: "Callagun Smith", location: [-37.8136, 144.9631], description: "Melbourne" },
        { name: "Kamau Mwangi", location: [-1.2921, 36.8219], description: "Nairobi" },
        { name: "Priya Sharma", location: [28.6139, 77.2090], description: "New Delhi" },
        { name: "Himari Satō", location: [35.0116, 135.7681], description: "Kyoto" }
    ];

    contributors.forEach(contributor => {
        L.marker(contributor.location)
            .addTo(map)
            .bindPopup(`<b>${contributor.name}</b><br>${contributor.description}`);
    });
});
