document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([35.0116, 135.7681], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    const locations = [
        { id: 1, name: "Hikari Machiya Studio", coords: [35.0035, 135.7780] },
        { id: 2, name: "Akari no Michi", coords: [35.0045, 135.7795] },
        { id: 3, name: "Katzura Eco-Island Center", coords: [35.0129, 135.6778] },
        { id: 4, name: "Bamboo Grove Knowledge Trail", coords: [35.0168, 135.6713] },
        { id: 5, name: "Kura no Megumi", coords: [34.9305, 135.7630] },
        { id: 6, name: "Midori no Kura", coords: [34.9310, 135.7645] },
    ];

    locations.forEach((location) => {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<b>${location.id}. ${location.name}</b>`);
    });
});
