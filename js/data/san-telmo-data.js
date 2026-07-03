/**
 * HEATED CITY - San Telmo (Buenos Aires) district data
 * Single source of truth for the map markers, project cards and modal
 * on cities/san-telmo.html. Rendered by js/city-page.js.
 */

const CITY_DATA = {
    name: 'San Telmo',
    center: [-34.6215, -58.3724],
    zoom: 16,
    projects: [
        {
            id: 'mercado-san-telmo',
            number: 1,
            title: 'San Telmo Market',
            location: 'Defensa 963, San Telmo',
            coords: [-34.6214, -58.3725],
            website: 'https://www.futures-in-maps.com/san-telmo/',
            image: 'https://www.futures-in-maps.com/san-telmo/images/san-telmo-map-wall.jpg',
            categories: 'community heritage',
            description: 'Built in 1897 and fully restored in 2028, San Telmo Market remains a vibrant shopping destination, a cool refuge on summer days with a wide range of products. The market embodies the richness and diversity of gastronomic possibilities, from specialty coffee and artisan bread to seasonal fruits and vegetables. It features a herboristería treasured by herbology enthusiasts, explores sustainable protein sources, and offers a paradise for history enthusiasts and technology aficionados with its collection of antiques and tech items.'
        },
        {
            id: 'refugios-termicos',
            number: 2,
            title: 'Historic Thermal Refuges',
            location: 'Casa de los Ezeiza, Defensa 1179, San Telmo',
            coords: [-34.6216, -58.3728],
            website: '#',
            image: '../img/san-telmo-refuge.webp',
            categories: 'heat heritage',
            description: 'A network of historic 19th-century buildings functions as thermal refuges during heat waves. These colonial structures and conventillos use their thick walls (60-80cm), arched galleries, and deep patios to maintain temperatures 5-8°C cooler than outside. During extreme heat days, spaces open to the public with water fountains, shade, and basic health monitoring for vulnerable neighbors. Casa Ezeiza, San Pedro Telmo Church (Carlos Calvo 242), and the ex-conventillo at Balcarce 1016 form the main nodes of this network coordinated by neighborhood centers.'
        },
        {
            id: 'cisterna-historica',
            number: 3,
            title: 'Historic Community Cistern',
            location: 'El Zanjón de Granados, Defensa 755, San Telmo',
            coords: [-34.6207, -58.3722],
            website: '#',
            image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/zanjon1500x610-20210414.jpg',
            categories: 'water heritage',
            description: 'The network of colonial tunnels and 18th-century cisterns beneath El Zanjón de Granados has been reactivated as a rainwater collection and storage system. The main 18,000-liter cistern receives water from 23 neighborhood rooftops through restored gutters. Stored water is used for irrigating community gardens, public space nebulizers, and drought reserves. Guided tours show the neighborhood\'s water archaeology and explain how 1700s Spanish infrastructure integrates with current level sensors and solar pumps. Additional cisterns are at Pasaje Giuffra 371 and Humberto Primo 340.'
        },
        {
            id: 'calles-frescas',
            number: 4,
            title: 'Cool Cobblestone Streets',
            location: 'Calle Defensa (Av. Belgrano - Av. San Juan), San Telmo',
            coords: [-34.6210, -58.3724],
            website: '#',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Calles_Empedradas_De_San_Telmo_Paved_Streets_%28210459027%29.jpeg/1024px-Calles_Empedradas_De_San_Telmo_Paved_Streets_%28210459027%29.jpeg',
            categories: 'heat green',
            description: 'The Defensa Street pedestrian corridor preserves its historic granite cobblestones, whose surface reflects more light and allows water infiltration, reducing ground temperature by 15°C compared to asphalt. Between 2026-2030, 47 plane trees were planted that now form a continuous canopy, generating 85% shade on sidewalks. Every 100 meters there are benches with green backrests, public water fountains, and planters with native species. Trees are irrigated with cistern water through underground drip systems. Sidewalks were replaced with porous tiles that absorb rain. The combined effect creates a microclimate 6°C cooler than adjacent streets, especially noticeable between 2-6pm.'
        },
        {
            id: 'plaza-dorrego',
            number: 5,
            title: 'Plaza Dorrego',
            location: 'Plaza Dorrego (Humberto Primo y Defensa), San Telmo',
            coords: [-34.6218, -58.3726],
            website: '#',
            image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/feria_de_san_telmo_1200_plaza_1.jpg',
            categories: 'green community',
            description: 'Buenos Aires\' oldest plaza after Plaza de Mayo has been transformed into a multi-use adaptive space. Sundays maintain the historic antiques fair, but now under deployable textile shade structures and stalls with modular vertical gardens. The restored central fountain (which existed until 1960) functions in three modes by temperature: ornamental, with perimeter nebulization, or intense water curtain. The ground preserves original cobblestones with widened joints to absorb 80% of rainwater. 23 native trees (tipas, ceibos, lapachos) were planted complementing the existing 24, achieving 70% coverage. A 2-meter perimeter rain garden manages water excess. On heat wave days, the plaza becomes a community refuge.'
        },
        {
            id: 'patios-huerta',
            number: 6,
            title: 'Shared Courtyard-Garden Network',
            location: 'Nodo Bolivar 958, San Telmo',
            coords: [-34.6220, -58.3735],
            website: '#',
            image: '../img/san-telmo-patios.webp',
            categories: 'green community',
            description: 'A network of 34 patios in historic conventillos and buildings has transformed into community urban gardens. The Bolivar 958 patio functions as coordination and training hub, producing monthly 340kg of vegetables, 45kg of herbs, and 78kg of fruits distributed among neighbors, community kitchens, and exchange with other networks. Patios maintain their original architecture (galleries, iron columns, limestone floors) but add raised beds, vertical gardens on railings, composters, and irrigation systems connected to historic cisterns. Eight patios in the block between Defensa and Bolivar are connected by shared gates that open during heat waves creating fresh air currents. Other active nodes: Defensa 1179, Pasaje San Lorenzo 380, Balcarce 1053.'
        }
    ]
};
