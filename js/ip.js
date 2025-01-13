'use strict';


async function getIpLoc(){
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json()
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
}


async function getIUTLoc() {
    try {
        const response = await fetch('https://nominatim.openstreetmap.org/search?q=iut+nancy+charlemagne&format=json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export {
    getIpLoc,
    getIUTLoc
}