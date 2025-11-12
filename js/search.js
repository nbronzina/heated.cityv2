/**
 * HEATED CITY - Search Functionality
 */

// Base de datos de ciudades y barrios (expande esto con todas tus ciudades)
const searchDatabase = [
    {
        title: 'Higashiyama',
        location: 'Kyoto, Japan',
        url: '/cities/kyoto.html',
        keywords: 'kyoto japan higashiyama bamboo machiya traditional'
    },
    {
        title: 'Balvanera',
        location: 'Buenos Aires, Argentina',
        url: '/cities/buenos-aires.html',
        keywords: 'buenos aires argentina balvanera abasto plaza'
    },
    // Agrega más ciudades aquí
];

// Abrir buscador
function openSearch() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    
    if (modal && input) {
        modal.classList.add('active');
        input.focus();
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar buscador
function closeSearch() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (input) input.value = '';
        if (results) results.innerHTML = '';
    }
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
    }
});

// Cerrar al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('searchModal');
    if (e.target === modal) {
        closeSearch();
    }
});

// Búsqueda en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchResults.innerHTML = '';
                return;
            }
            
            // Filtrar resultados
            const results = searchDatabase.filter(item => {
                return item.title.toLowerCase().includes(query) ||
                       item.location.toLowerCase().includes(query) ||
                       item.keywords.toLowerCase().includes(query);
            });
            
            // Mostrar resultados
            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <div class="search-result-item">
                        <a href="${item.url}">
                            <div class="search-result-title">${item.title}</div>
                            <div class="search-result-location">${item.location}</div>
                        </a>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = `
                    <div class="search-no-results">
                        No results found for "${query}"
                    </div>
                `;
            }
        });
    }
});
