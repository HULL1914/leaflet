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
    [44.4574, -110.82147],
    [44.45755, -110.82159],
    [44.45772, -110.82168],
    [44.45832, -110.8219],
    [44.45843, -110.82192],
    [44.45854, -110.82191],
    [44.45867, -110.82185],
    [44.45869, -110.82183],
    [44.45878, -110.82184],
    [44.45884, -110.82186],
    [44.45899, -110.82201],
    [44.45913, -110.82218],
    [44.4593, -110.82227],
    [44.45986, -110.82216],
    [44.45992, -110.82219],
    [44.46011, -110.82277],
    [44.46041, -110.82319],
    [44.46042, -110.82379],
    [44.46046, -110.82388],
    [44.46071, -110.82406],
    [44.46117, -110.82412],
    [44.46134, -110.8242],
    [44.4616, -110.82523],
    [44.46183, -110.82561],
    [44.46187, -110.82576],
    [44.46183, -110.8261],
    [44.46163, -110.82647],
    [44.4617, -110.82695],
    [44.46178, -110.82723],
    [44.46183, -110.82772],
    [44.46211, -110.82824],
    [44.46219, -110.82856],
    [44.46219, -110.82901],
    [44.46197, -110.8298],
    [44.46223, -110.83099],
    [44.46239, -110.83124],
    [44.46288, -110.83133],
    [44.46304, -110.83145],
    [44.46309, -110.83168],
    [44.46302, -110.83211],
    [44.46303, -110.83241],
    [44.46311, -110.83263],
    [44.4632, -110.83272],
    [44.46344, -110.83279],
    [44.4637, -110.83265],
    [44.46399, -110.83266],
    [44.46435, -110.83236],
    [44.46448, -110.83244],
    [44.46454, -110.83256],
    [44.46457, -110.83276],
    [44.46453, -110.83315],
    [44.46409, -110.83386],
    [44.46408, -110.83456],
    [44.46415, -110.83499],
    [44.4646, -110.83589],
    [44.46484, -110.83694],
    [44.46507, -110.83744],
    [44.46512, -110.83768],
    [44.46542, -110.8381],
    [44.46554, -110.83857],
    [44.46576, -110.83896],
    [44.46584, -110.83923],
    [44.46606, -110.83956],
    [44.46615, -110.83989],
    [44.46612, -110.84064],
    [44.46615, -110.84103],
    [44.46625, -110.84129],
    [44.46642, -110.84147],
    [44.46673, -110.84161],
    [44.46733, -110.84152],
    [44.46774, -110.84113],
    [44.46873, -110.84072],
    [44.46914, -110.83997],
    [44.46931, -110.83979],
    [44.4698, -110.83972],
    [44.47046, -110.84008],
    [44.47082, -110.84001],
    [44.4713, -110.84009],
    [44.47179, -110.84065],
    [44.47243, -110.84077],
    [44.47281, -110.84112],
    [44.47315, -110.84112],
    [44.47341, -110.84113],
    [44.47384, -110.84148],
    [44.47401, -110.8418],
    [44.47417, -110.84288],
    [44.47457, -110.84359],
    [44.47499, -110.84419],
    [44.47515, -110.84431],
    [44.47571, -110.84445],
    [44.47609, -110.84435]
];

const geyser_trail = [
    [44.46362, -110.83716],
    [44.46346, -110.83688],
    [44.46268, -110.83556],
    [44.46194, -110.83451],
    [44.46182, -110.83434],
    [44.46152, -110.83374],
    [44.4614, -110.83335],
    [44.46123, -110.8328],
    [44.46092, -110.83102],
    [44.45931, -110.82957],
    [44.45923, -110.82946],
    [44.4592, -110.82942],
    [44.45915, -110.82934],
    [44.45899, -110.82903],
    [44.45897, -110.82896],
    [44.45894, -110.82887],
    [44.45893, -110.82882],
    [44.45884, -110.82832],
    [44.45888, -110.82759],
    [44.4589, -110.82746],
    [44.45891, -110.82741],
    [44.45896, -110.82724],
    [44.45904, -110.82698],
    [44.45946, -110.82622]
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
            [44.4633, -110.8312],
            [44.4626, -110.829]
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
    L.polyline(geyser_trail,   { color: '#a6531c', weight: 3, dashArray: '6 6' }).bindTooltip('Upper Geyser Basin Trail (Castle Geyser to Old Faithful Lodge)')
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