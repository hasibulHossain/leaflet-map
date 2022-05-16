const lat = 23.806164;
const lng = 90.387083;

var map = L.map('map').setView([lat, lng], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFzaWJ1bGhvc3NhaW4iLCJhIjoiY2wzOGE1c3MyMGdvcTNrcTMzaWFua3ZmNSJ9.qZvxgu4VrTpDTKayhR0jPQ'
}).addTo(map);



var marker = L.marker([lat, lng]).addTo(map);

// var circle = L.circle([lat, lng], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("Inside circle");

const polygon = L.polygon([
    [23.80618, 90.386694],
    [23.805325, 90.386716],
    [23.805404, 90.387257],
    [23.80618, 90.387225]
], {
    color: 'red',
    fillColor: '#ccc',
    fillOpacity: 0.5,
}).addTo(map);

polygon.on('mouseover', function (e) {
    // e.target.options.color = 'blue';
    console.log(this);
})

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

