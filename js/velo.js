'use strict';

async function getStationsInfo(){
    try {
        const response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_information.json');
        const data = await response.json();
        return data.data.stations;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

async function getStationsStatus(){
    try {
        const response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_status.json');
        const data = await response.json();
        return data.data.stations;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

async function createVeloMap(coordonneeClient){
    let stationsInfo = await getStationsInfo();
    let stationsStatus = await getStationsStatus();
    var map = L.map('map-container').setView(coordonneeClient, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let stations = stationsInfo.map(info => {
        let status = stationsStatus.find(status => status.station_id === info.station_id);
        return {
            ...info,
            ...status
        };
    });
    stations.forEach(station => {
        let marker = L.marker([station.lat, station.lon]).addTo(map);
        let popupContent = `
            <b>${station.name}</b><br>
            ${station.address}<br>
            Vélos disponibles: ${station.num_bikes_available}<br>
            Docks disponibles: ${station.num_docks_available}
        `;
        marker.bindPopup(popupContent);
    });
}

export {
    createVeloMap
}