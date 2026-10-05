const map = L.map('map', {
    center: [44.4673, -110.8335],
    zoom: 16
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
});

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
}).addTo(map);

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const geysers = [
    { name: "Old Faithful",       coords: [44.46047, -110.82814],   note: "Erupts about every 60 to 110 minutes." },
    { name: "Beehive Geyser",     coords: [44.4629887, -110.8299335], note: "Tall, narrow column of water from a cone shaped like a beehive." },
    { name: "Castle Geyser",      coords: [44.463445, -110.83666],  note: "Has one of the largest and oldest sinter cones in the basin." },
    { name: "Grand Geyser",       coords: [44.4665996, -110.8382669], note: "The tallest predictable geyser in the world." },
    { name: "Riverside Geyser",   coords: [44.4735439, -110.840489], note: "Arcs out over the Firehole River." }
];

const hot_springs = [
    { name: "Doublet Pool",       coords: [44.4643188, -110.8296237], note: "Clear blue pool on Geyser Hill." },
    { name: "Crested Pool",       coords: [44.46406, -110.8365],    note: "Deep, boiling pool right next to Castle Geyser." },
    { name: "Morning Glory Pool", coords: [44.4750325, -110.8435128], note: "Colors faded after visitors threw coins and trash in it." }
];

const visitor_sites = [
    { name: "Old Faithful Inn",   coords: [44.45972, -110.83111],   note: "Historic log hotel built in 1904." },
    { name: "Old Faithful Lodge", coords: [44.459528, -110.826056], note: "Cafeteria and cabins facing Old Faithful." }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],
        iconAnchor:  [12, 32],
        popupAnchor: [0, -28]
    });
}

const GEYSER_COLOR  = '#e8590c';
const SPRING_COLOR  = '#1c7ed6';
const VISITOR_COLOR = '#2b8a3e';

const firehole_river = [
    [44.4588, -110.8232],
    [44.4605, -110.8248],
    [44.4618, -110.8268],
    [44.4625, -110.8292],
    [44.4630, -110.8318],
    [44.4637, -110.8342],
    [44.4650, -110.8372],
    [44.4666, -110.8392],
    [44.4700, -110.8405],
    [44.4735, -110.8411],
    [44.4765, -110.8418]
];

const geyser_trail = [
    [44.4598, -110.8295],
    [44.4612, -110.8312],
    [44.4626, -110.8345],
    [44.4638, -110.8374],
    [44.4660, -110.8395],
    [44.4700, -110.8415],
    [44.4735, -110.8418],
    [44.4748, -110.8432]
];

const old_faithful_viewing = [
    [
        [44.46047, -110.826752],
        [44.460965, -110.826938],
        [44.461328, -110.827446],
        [44.461461, -110.82814],
        [44.461328, -110.828834],
        [44.460965, -110.829342],
        [44.46047, -110.829528],
        [44.459975, -110.829342],
        [44.459612, -110.828834],
        [44.459479, -110.82814],
        [44.459612, -110.827446],
        [44.459975, -110.826938]
    ],
    [
        [44.46047, -110.827446],
        [44.460222, -110.827539],
        [44.460041, -110.827793],
        [44.459975, -110.82814],
        [44.460041, -110.828487],
        [44.460222, -110.828741],
        [44.46047, -110.828834],
        [44.460718, -110.828741],
        [44.460899, -110.828487],
        [44.460965, -110.82814],
        [44.460899, -110.827793],
        [44.460718, -110.827539]
    ]
];

const thermal_areas = [
    [
        [
            [44.4652, -110.8285],
            [44.4655, -110.8308],
            [44.4631, -110.8314],
            [44.4628, -110.829]
        ]
    ],
    [
        [
            [44.4642, -110.8358],
            [44.4644, -110.8376],
            [44.4628, -110.8377],
            [44.4628, -110.8358]
        ]
    ]
];

const geysersLayer = L.layerGroup(
    geysers.map(f => L.marker(f.coords, { icon: svgIcon(GEYSER_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const springsLayer = L.layerGroup(
    hot_springs.map(f => L.marker(f.coords, { icon: svgIcon(SPRING_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const visitorLayer = L.layerGroup(
    visitor_sites.map(f => L.marker(f.coords, { icon: svgIcon(VISITOR_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const linesLayer = L.layerGroup([
    L.polyline(firehole_river, { color: '#4dabf7', weight: 5 }).bindTooltip('Firehole River'),
    L.polyline(geyser_trail,   { color: '#a6531c', weight: 3, dashArray: '6 6' }).bindTooltip('Upper Geyser Basin Trail')
]).addTo(map);

const areasLayer = L.layerGroup([
    L.polygon(old_faithful_viewing, { color: '#5f3dc4', fillColor: '#5f3dc4', fillOpacity: 0.3 })
        .bindTooltip('Old Faithful viewing area (cone area excluded)', { direction: 'top', offset: [0, -8] }),
    L.polygon(thermal_areas, { color: '#f08c00', fillColor: '#f08c00', fillOpacity: 0.3 })
        .bindTooltip('Thermal areas: Geyser Hill and Castle group', { direction: 'top', offset: [0, -8] })
]).addTo(map);

L.control.layers(
    { "Satellite": satellite, "Streets": streets, "Topographic": topo, "OpenStreetMap": osm },
    { "Geysers": geysersLayer, "Hot springs": springsLayer, "Visitor sites": visitorLayer,
      "River & trail": linesLayer, "Areas": areasLayer }
).addTo(map);

map.fitBounds(L.featureGroup([geysersLayer, springsLayer, visitorLayer, linesLayer, areasLayer]
    .flatMap(g => g.getLayers())).getBounds(), { padding: [30, 30] });