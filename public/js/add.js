console.log('add loaded');

const inputName = document.querySelector('.input-name');
const inputDescription = document.querySelector('.input-description');
const inputPrice = document.querySelector('.input-price');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function(e){
    e.preventDefault();

    //we lezen de waarden uit van het formulier
    const name = inputName.value;
    const description = inputDescription.value;
    const price = inputPrice.value;

    (async () => {
        //we voeren de fetch uit naar de url /user-add, gebruiken de POST methode en gaan json versturen in de body
        const rawResponse = await fetch('/icecream-add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description, price: price })
        });
        //het antwoord wat we van de server terugkrijgen zetten we om naar een JavaScript object met json();
        const content = await rawResponse.json();

        //in het object wat we terugkrijgen verwachten we de property userAdded die ofwel true of false is
        if(content.icecreamAdded){
            //als de waarde true is dan is de gebruiker toegevoegd
            alert('Ijsje toegevoegd');
        } else{
            //als de waarde false is dan is er iets misgegaan met het toevoegen
            alert('Niet gelukt om het ijsje toe te voegen');
        }

    })();
});
