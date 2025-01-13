'use strict';

export {
    addAirQuality
}
async function getAirQuality(city) {
    const url = "https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

    const response = await fetch(url);
    const data = await response.json();
    let latestFeature = null;

    const today = new Date().toISOString().split('T')[0];
    for (const feature of data.features) {
        const timestamp = feature.attributes.date_ech / 1000;
        const featureDate = new Date(timestamp * 1000).toISOString().split('T')[0];
        if (feature.attributes.lib_zone === city && featureDate === today) {
            latestFeature = feature;
            break;
        }
    }

    return latestFeature ? latestFeature.attributes : null;
}

async function addAirQuality(ville) {
    const airQuality = await getAirQuality(ville);

    const airQualityEl= document.getElementById('air');
    airQualityEl.innerHTML = "Air : " + airQuality.lib_qual;
}
