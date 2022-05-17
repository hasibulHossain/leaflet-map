const lat = 23.806164;
const lng = 90.387083;

const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';


const map = L.map('map').setView([lat, lng], 7);


const listLayer = L.tileLayer(tileUrl, {
    attribution: attribution,
    maxZoom: 18,
    minZoom: 5,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFzaWJ1bGhvc3NhaW4iLCJhIjoiY2wzOGE1c3MyMGdvcTNrcTMzaWFua3ZmNSJ9.qZvxgu4VrTpDTKayhR0jPQ'
});

listLayer.addTo(map);



(function () {
    const ul = document.querySelector('.division-list');

    divisionList.features.forEach(item => {
        const divisionCard = document.createElement('li');
        const division = document.createElement('div');
        const divisionName = document.createElement('h2');
        const p = document.createElement('p');

        divisionName.addEventListener('click', () => { flyToExactLatlng(item) });

        divisionCard.classList.add('division-card');
        division.classList.add('division');
        divisionName.classList.add('division-name');

        divisionName.textContent = item.properties.address;
        p.textContent = item.properties.info;

        division.appendChild(divisionName);
        division.appendChild(p);
        divisionCard.appendChild(division);

        ul.appendChild(divisionCard);
    })
})();


const myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [27.5, 39.6],
    // iconAnchor: [12, 94],
})

const divisionsLayer = L.geoJSON(divisionList, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(createPopup(feature), { closeButton: false, offset: L.point(0, -10) })
    },
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, { icon: myIcon });
    }
});

function createPopup(feature) {
    return `
    <div class="popup-card">
        <h2>${feature.properties.address}</h2>
        <p>${feature.properties.info}</p>
        <div>
            <a href="tel:${feature.properties.phone}">
            ${feature.properties.phone}
            </a>
        </div>
    </div>
    `
}

divisionsLayer.addTo(map);

function flyToExactLatlng(division) {

    const lng = division.geometry.coordinates[1];
    const lat = division.geometry.coordinates[0];

    map.flyTo([lng, lat], 14, {
        duration: 2,
    });

    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -10), maxWidth: 200 })
            .setLatLng([lng, lat])
            .setContent(createPopup(division))
            .openOn(map);
    }, 1500);

}
