/**
 * CITIES THAT CARE - Protocols page
 * Renders the protocol entries from PROTOCOLS (js/data/protocols-data.js).
 */

const list = document.getElementById('protocolsList');

PROTOCOLS.forEach(p => {
    const entry = document.createElement('section');
    entry.className = 'protocol-entry';
    entry.id = p.id;

    entry.innerHTML = `
        <div class="project-eyebrow">
            <span class="project-index">${p.number}</span>
            <span>Protocol</span>
        </div>
        <h2>${p.name}</h2>
        <p class="protocol-problem">${p.problem}</p>
        <p class="protocol-practice">${p.practice}</p>
        <div class="protocol-links">
            <span class="protocol-links-label">Documented in:</span>
            ${p.documented.map(d => `<a href="${d.url}">${d.label}</a>`).join('')}
        </div>
    `;
    list.appendChild(entry);
});
