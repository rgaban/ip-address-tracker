const form = document.getElementById('form');
const ipInput = document.getElementById('search');
const ip = document.getElementById('ip');
const location = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const apiKey = 'at_eBa2LBMLPiK8MNirYXTNvDQDOO6b0';

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// Update UI
const updateDOM = (results) => {
    ip.textContent = results.ip;
    location.textContent = `${results.location.city}, ${results.location.region}`;
    timezone.textContent = `${results.location.timezone} UTC`;
    isp.textContent = results.isp;
}

// Fetch data from Geolocation API
async function getData(ipAdd) {
    try {
        // fetch data from api
        const proxyUrl = 'https://thawing-temple-52390.herokuapp.com/';
        const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAdd}`;
        const response = await fetch(proxyUrl + apiUrl);
        let results = await response.json();

        console.log(results);
        // update ui
        updateDOM(results);
        setMap(results.location.lat, results.location.lng);
    } catch (err) {
        alert('Something went wrong...');
        console.log(err);
    }
}

// Set map coordinates
function setMap (lat, lng) {
    mymap.setView([lat, lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmdhYmFuIiwiYSI6ImNrZXpmbXkyMTBpYWYzM3B1dW9lbXllaTAifQ.vCMf3Z3oIYoRBgXlIzwNzw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    let myIcon = L.icon({
        iconUrl: '../images/icon-location.svg'
    });

    L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
}

// Event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getData(ipInput.value);
});

// Init
window.onload = () => {
    setMap (51.505, -0.09);
}
