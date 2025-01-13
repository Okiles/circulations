'use strict';

function createGraph(chart, data, label){
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    const ctx = document.getElementById(chart);
    ctx.innerHTML = '';
    const myChart = ctx.getContext('2d');
    new Chart(myChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                borderColor: 'rgba(200, 200, 50, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

export {
    createGraph
}