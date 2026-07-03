/**
 * HEATED CITY - Kyoto (Higashiyama) district data
 * Single source of truth for the map markers, project cards and modal
 * on cities/kyoto.html. Rendered by js/city-page.js.
 */

const CITY_DATA = {
    name: 'Kyoto',
    center: [34.9985, 135.7780],
    zoom: 14,
    projects: [
        {
            id: 'hikari-machiya',
            number: 1,
            title: 'Hikari Machiya Community Workshop',
            location: 'Higashiyama-ku, Kyoto',
            coords: [34.9965, 135.7799],
            website: '#',
            image: '../img/kyoto-papermaking.webp',
            categories: 'biointegration traditional',
            description: 'The converted machiya where Himari Satō first observed the Yamamoto family\'s fifteen-minute-early arrivals that led to the "soft arrival periods" innovation. Traditional papermaking workshops integrate with biointegration system calibration, creating spaces where craft, community gathering, and atmospheric coordination naturally overlap.'
        },
        {
            id: 'bamboo-grove',
            number: 2,
            title: 'Bamboo Grove Acoustic Monitors',
            location: 'Arashiyama, Kyoto',
            coords: [35.0094, 135.6700],
            website: '#',
            image: '../img/kyoto-bamboo-sensor.webp',
            categories: 'atmospheric community',
            description: 'Acoustic monitoring systems embedded in bamboo groves connect traditional seasonal observation practices with neighborhood atmospheric processing schedules. The rustling bamboo sounds inform system calibrations, creating feedback loops between natural phenomena and urban infrastructure.'
        },
        {
            id: 'mineral-pools',
            number: 3,
            title: 'Seasonal Mineral Pools',
            location: 'Higashiyama District',
            coords: [35.0012, 135.7783],
            website: '#',
            image: '../img/kyoto-mineral-pools.webp',
            categories: 'seasonal biointegration',
            description: 'Temperature-responsive mineral pools where grandmother Kimiko\'s arthritic joints found relief during morning visits. The three-week mineral cycling patterns became templates for atmospheric system optimization, demonstrating how individual care needs inform collective infrastructure.'
        },
        {
            id: 'machiya-integration',
            number: 4,
            title: 'Machiya Infrastructure Integration',
            location: 'Historic Higashiyama',
            coords: [34.9988, 135.7826],
            website: '#',
            image: '../img/kyoto-machiya.webp',
            categories: 'traditional community',
            description: 'Traditional wooden machiya buildings retrofitted with biointegration systems that respect architectural heritage while enabling atmospheric coordination. Split-unit air conditioning discretely mounted on traditional facades, PVC utility conduits following wood beam structures.'
        },
        {
            id: 'atmospheric-gardens',
            number: 5,
            title: 'Atmospheric Processing Gardens',
            location: 'Throughout Higashiyama',
            coords: [34.9942, 135.7752],
            website: '#',
            image: '../img/kyoto-gardens.webp',
            categories: 'atmospheric seasonal',
            description: 'Distributed garden spaces where atmospheric processing occurs through biointegrated plant systems. Seasonal patterns of growth and dormancy inform neighborhood climate coordination, making infrastructure visible through living systems.'
        },
        {
            id: 'coordination-centers',
            number: 6,
            title: 'Community Coordination Centers',
            location: 'Multiple Locations, Higashiyama',
            coords: [35.0022, 135.7812],
            website: '#',
            image: '../img/kyoto-coordination.webp',
            categories: 'community traditional',
            description: 'Weekly Wednesday gathering spaces where Himari Satō developed community dialogue methods for discussing environmental preferences and system adjustments. These coordination protocols became standard practice in 23 districts worldwide.'
        }
    ]
};
