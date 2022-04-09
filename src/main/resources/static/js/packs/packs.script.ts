// @ts-ignore

// Récupérer tous les pokemons à partir de l'api https://api.pokemontcg.io/v2/cards et les stocker dans un tableau


// Au chargement du document en jquery
$(document).ready(() => {
    // drawRandomPokemons();

    drawPokemons('colorless');


    function drawPokemons(type) {
        type = type.toLowerCase();
        let pokemonsDrawed = [];




        for (let i = 0; i < 5; i++) {
            // If type = Colorless, randomPage could go only to page 7

            let pokemons = [];
            let pokeCardURL = '';
            if (type !== 'random') {
                pokeCardURL = `https://api.pokemontcg.io/v2/cards?q=types:${type}&page=${numberPage(type)}`;
                console.log(" page : " + numberPage(type));
            } else {
                pokeCardURL = `https://api.pokemontcg.io/v2/cards?page=${numberPage(type)}`;
            }

            fetch(pokeCardURL, {
                method: "GET",
                // @ts-ignore
                withCredentials: true,
                headers: {
                    "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
                    "Content-Type": "application/json",
                },
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Sort through per card per pokemon name
                    // @ts-ignore
                    for (x = 0; x < data.data.length; x++) {
                        // @ts-ignore

                        // @ts-ignore
                        pokemons.push(data.data[x]);
                    }
                });


            setInterval(() => {

                if (pokemonsDrawed.length < 5) {
                    let random = Math.floor(Math.random() * pokemons.length);
                    console.log("COUCOU : " + i + " " + pokemons[random]['name']);
                    console.log("COUCOU : " + i + " " + pokemons[random]['images']['large']);

                    let pokemonImage = pokemons[random]['images']['large'];
                    let pokemonName = pokemons[random]['name'];
                    console.log(pokemonImage);
                    $('.allPacks').append(`
            <div class = "carte" data-attr="${pokemonName}">
                <div class = "double-face">
                <div class = "face">
                <img src="${pokemonImage}"></div> 
                <div class = "arriere">
            </div>`);

                    pokemonsDrawed.push(pokemons[random]);
                    console.log("Pokemons eu : " + pokemonsDrawed[i]['name']);
                }
            }, 1500);
        }
    }

});


$(document).mouseover((e) => {
    // @ts-ignore
    if (e.target.classList.contains("arriere")) {
        // @ts-ignore
        e.target.style.cursor = "pointer";
    }
});


$(document).click((e) => {

    // If the card is backward and that no card has been turned yet
    // @ts-ignore
    if (e.target.classList.contains('arriere')) {
        console.log('coucou')
        // @ts-ignore
        e.target.style.display = 'block';
        // Make an effect of rotation and disappear and make appear face


        // Flip the card
        // @ts-ignore
        flip(e.target.parentNode);
        // @ts-ignore
        console.log(e.target.parentNode.classList);
    }
});

// @ts-ignore
async function flip(card) {
    // Put the class that will permit to flip the card and play the sound

    // Cibler l'enfant de la card
    // @ts-ignore

    card.classList.toggle("active");

}


function numberPage(type) {
    let randomPage = 0;
    if (type === 'colorless') {
        randomPage = Math.ceil(Math.random() * 7);
    } else if (type === 'darkness') {
        randomPage = Math.ceil(Math.random() * 4);
    }else if (type === 'dragon') {
        randomPage = Math.ceil(Math.random() * 2);
    }else if (type === 'fairy') {
        randomPage = 1;
    }else if (type === 'fighting') {
        randomPage = Math.ceil(Math.random() * 6);
    }else if (type === 'fire') {
        randomPage = Math.ceil(Math.random() * 6);
    }else if (type === 'grass') {
        randomPage = Math.ceil(Math.random() * 8);
    }else if (type === 'lightning') {
        randomPage = Math.ceil(Math.random() * 5);
    }else if (type === 'metal') {
        randomPage = Math.ceil(Math.random() * 3);
    }else if (type === 'psychic') {
        randomPage = Math.ceil(Math.random() * 7);
    }else if (type === 'random') {
        randomPage = Math.ceil(Math.random() * 59);
    } else if (type === 'water') {
        randomPage = Math.ceil(Math.random() * 8);
    }

    return randomPage
}



