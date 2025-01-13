import * as covid from "./covid.js";
import { createGraph } from "./graph.js";
import { getIpLoc } from "./ip.js";
import { createVeloMap } from "./velo.js";
import { addAirQuality } from "./air.js";
import { addWeather } from "./meteo.js";


window.addEventListener('load', async function() {
    const ipInfo = await getIpLoc();

    await addMaxData();
    await addVelosData(ipInfo);
    await addAirQuality('Nancy');
    await addWeather(ipInfo);
});

async function addMaxData() {
    const maxData = await covid.fetchAllMaxData();
    createGraph('graphMax', maxData, 'SARS dans les eaux usées de Maxéville');
}

async function addVelosData(ipInfo) {
    const coordClient = [ipInfo.latitude, ipInfo.longitude];
    await createVeloMap(coordClient);
}