console.log('Main loaded');

const cardRow = document.querySelector('.card-container');
const priceChart = document.querySelector('.price-chart');
const priceChartPie = document.querySelector('.price-chart-pie');

fetch('/icecreams/')
    .then(data => data.json())
    .then(jsonData => showIceCreams(jsonData));

function showIceCreams(icecreams){
    console.log(icecreams);

    const labels = [];
    const data = [];
    let htmlCode = '';
    for (let i = 0; i < icecreams.length; i++) {
        const icecream = icecreams[i];
        htmlCode += createCard(icecream);
        labels.push(icecream.icecream);
        data.push(icecream.price);
    }
    cardRow.innerHTML = htmlCode;
    console.log(labels);
    console.log(data);
    createChart(priceChart, labels, data, 'Prijs per ijsje', 'bar');
    createChart(priceChartPie, labels, data, 'Prijs per ijsje', 'pie');
}

function createCard(icecream){
    const card = `
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${icecream.icecream}</h4>
                    <p class="card-text">${icecream.description}</p>
                    <p class="card-text">€ ${icecream.price}</p>
                </div>
            </div>
        </div>`;
    return card;
}

function createChart(canvas, labels, data, label, type){
    new Chart(canvas, {
        type: type,
        data: {
          //de labels komen op de x as
          labels: labels,
          datasets: [{
            label: label,
            // de data komt op de y as
            data: data,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
}