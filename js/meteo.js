'use strict';

async function getWeather(ipInfo) {
    const url = 'https://www.infoclimat.fr/public-api/gfs/json?_ll='+ipInfo.latitude+','+ipInfo.longitude+'&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function getWeatherHTML(data, time) {
    const temp = Math.round(data['temperature']['2m'] - 273.15);
    const wind = data['vent_moyen']['10m'];
    let tempsClass;
    let tempsDesc
    if(data['risque_neige'] > 0) {
        tempsClass = 'fa-snowflake';
        tempsDesc = 'risque de neige';
    }else if(data['pluie'] > 0) {
        tempsClass = 'fa-cloud-showers-heavy';
        tempsDesc = 'Pluie '+ data['pluie'] + 'mm';
    }else if(data['nebulosite']['totale'] > 50) {
        tempsClass = 'fa-cloud';
        tempsDesc = 'Nuageux';
    }else if (data['nebulosite']['totale'] > 20) {
        tempsClass = 'fa-cloud-sun';
        tempsDesc = 'Peu nuageux';
    }else {
        tempsClass = 'fa-sun';
        tempsDesc = 'Ensoleillé';
    }

    return `
    <div class="weather-item">
        <h2 class="hour">${time}</h2>
        <div class="weather-content">
            <div class="temperature">
                <i class="fas fa-thermometer-empty"></i><p>${temp}°C</p>
            </div>
            <div class="vent">
                <i class="fas fa-wind"></i><p>${wind} km/h</p>
            </div>
            <div class="temps">
                <i class="fas ${tempsClass}"></i><p>${tempsDesc}</p>
            </div>
        </div>
    </div>
    `;
}

async function addWeather(ipInfo) {
    const weatherData = await getWeather(ipInfo);
    const weatherContainer = document.getElementById('weather-schedule');
    const entries = Object.entries(weatherData);
    const data = [entries[8], entries[10], entries[12], entries[14]];
    const timeOfDay = ['Matinée', 'Midi', 'Soir', 'Nuit'];

    weatherContainer.innerHTML = data.map((weatherData, index) => {
        return getWeatherHTML(weatherData[1], timeOfDay[index]);
    }).join('');
}

export {
    addWeather
}