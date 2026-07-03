/**
 * CITIES THAT CARE - Protocols of care
 * Practices that repeat across districts. Each protocol links back to
 * the projects where it is documented. Rendered by js/protocols.js.
 */

const PROTOCOLS = [
    {
        id: 'soft-arrival',
        number: 1,
        name: 'Soft Arrival Periods',
        problem: 'Climate systems calibrated to fixed schedules ignore how people actually arrive.',
        practice: 'Community spaces open their atmospheric systems in gradual windows instead of on-the-hour switches. The protocol began when Higashiyama coordinators noticed the Yamamoto family arriving fifteen minutes early to gathering spaces, and recalibrated around people instead of clocks.',
        documented: [
            { label: 'Hikari Machiya Community Workshop — Higashiyama', url: 'cities/kyoto.html#project-hikari-machiya' }
        ]
    },
    {
        id: 'seasonal-observation',
        number: 2,
        name: 'Seasonal Observation Protocols',
        problem: 'Infrastructure tuned only by sensors misses what long attention to a place knows.',
        practice: 'Traditional seasonal observation — the acoustics of bamboo, mineral cycles in the pools, bloom and dormancy in the gardens — feeds system calibration alongside the instruments. The oldest monitoring network a neighborhood has is its own attention.',
        documented: [
            { label: 'Bamboo Grove Acoustic Monitors — Arashiyama', url: 'cities/kyoto.html#project-bamboo-grove' },
            { label: 'Seasonal Mineral Pools — Higashiyama', url: 'cities/kyoto.html#project-mineral-pools' }
        ]
    },
    {
        id: 'coordination-assemblies',
        number: 3,
        name: 'Coordination Assemblies',
        problem: 'Climate systems fail socially before they fail technically.',
        practice: 'Weekly open gatherings where neighbors negotiate environmental preferences and system adjustments before anything is changed. The dialogue methods developed in Higashiyama became the standard across the network: no calibration without conversation.',
        documented: [
            { label: 'Community Coordination Centers — Higashiyama', url: 'cities/kyoto.html#project-coordination-centers' }
        ]
    },
    {
        id: 'thermal-refuge-network',
        number: 4,
        name: 'Thermal Refuge Networks',
        problem: 'Heat waves are deadliest for neighbors who cannot cool their own homes.',
        practice: 'Historic buildings with thick walls, arched galleries and deep patios open to the public on extreme heat days — water, shade, and basic health monitoring — coordinated by neighborhood centers as a single network of nodes rather than isolated shelters.',
        documented: [
            { label: 'Historic Thermal Refuges — San Telmo', url: 'cities/san-telmo.html#project-refugios-termicos' },
            { label: 'Machiya Infrastructure Integration — Higashiyama', url: 'cities/kyoto.html#project-machiya-integration' }
        ]
    },
    {
        id: 'water-commons',
        number: 5,
        name: 'Reactivated Water Commons',
        problem: 'Rain falls on rooftops and disappears while droughts grow longer.',
        practice: 'Historic cisterns and tunnels return to service: rooftop collection feeds shared storage, and level sensors with solar pumps distribute the water to community gardens, public misters and drought reserves. Storage the neighborhood already owned, plumbed back into daily life.',
        documented: [
            { label: 'Historic Community Cistern — San Telmo', url: 'cities/san-telmo.html#project-cisterna-historica' },
            { label: 'Plaza Dorrego rain garden — San Telmo', url: 'cities/san-telmo.html#project-plaza-dorrego' }
        ]
    },
    {
        id: 'cool-corridors',
        number: 6,
        name: 'Cool Corridors',
        problem: 'Asphalt stores heat exactly where people need to walk.',
        practice: 'Pedestrian corridors keep their reflective historic surfaces and add continuous tree canopy, porous sidewalks and cistern-fed drip irrigation. The combined microclimate runs several degrees cooler than adjacent streets in the worst afternoon hours.',
        documented: [
            { label: 'Cool Cobblestone Streets — San Telmo', url: 'cities/san-telmo.html#project-calles-frescas' }
        ]
    },
    {
        id: 'connected-courtyards',
        number: 7,
        name: 'Connected Courtyards',
        problem: 'A private patio cools one family; the block stays hot.',
        practice: 'Courtyard gardens link through shared gates that open during heat waves, creating cross-currents of fresh air and a distributed harvest shared between neighbors, community kitchens and other networks.',
        documented: [
            { label: 'Shared Courtyard-Garden Network — San Telmo', url: 'cities/san-telmo.html#project-patios-huerta' },
            { label: 'Atmospheric Processing Gardens — Higashiyama', url: 'cities/kyoto.html#project-atmospheric-gardens' }
        ]
    }
];
