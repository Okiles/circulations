'use strict';

async function fetchMaxPage(page = 1, pageSize = 50) {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=' + page + '&page_size=' + pageSize;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.data) {
            console.warn("Réponse inattendue de l'API:", data);
            return [];
        }

        return data.data
            .filter(item => item.MAXEVILLE !== null)
            .map(item => ({
                label: item.semaine,
                value: item.MAXEVILLE
            }));
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
    }
}

async function fetchAllMaxData(){
    let page = 1;
    let allData = [];
    while (true) {
        let pageData = await fetchMaxPage(page);
        if (pageData.length === 0) {
            break;
        }
        allData = allData.concat(pageData);
        page++;
    }
    return allData;
}

async function fetchSarsDataByDepartment(department, page = 1, pageSize = 50) {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const twoYearsAgoString = twoYearsAgo.toISOString().split('T')[0];
    const url = `https://tabular-api.data.gouv.fr/api/resources/5c4e1452-3850-4b59-b11c-3dd51d7fb8b5/data/?dep__exact=${department}&date__greater=${twoYearsAgoString}&page=${page}&page_size=${pageSize}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        return [];
    }
}

export {
    fetchAllMaxData,
}