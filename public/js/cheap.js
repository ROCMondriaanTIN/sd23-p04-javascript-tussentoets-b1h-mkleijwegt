console.log('cheap loaded');

const cardRow = document.querySelector('.card-container');

fetch('/cheap-icecreams/')
    .then(data => data.json())
    .then(jsonData => showIceCreams(jsonData));

function showIceCreams(icecreams){
    console.log(icecreams);

    let htmlCode = '';
    for (let i = 0; i < icecreams.length; i++) {
        const icecream = icecreams[i];
        if(icecream.price < 5){
            htmlCode += createCard(icecream);
        }
    }
    cardRow.innerHTML = htmlCode;
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