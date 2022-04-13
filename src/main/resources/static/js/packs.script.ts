// Récupérer tous les pokemons à partir de l'api https://api.pokemontcg.io/v2/cards et les stocker dans un tableau
// Au chargement du document en jquery
$(document).ready(() => {
    // @ts-ignore
    generatePacksFromAPI(checkCookie());
});

let div: HTMLElement = document.querySelector('.allPacks');

function generatePacksFromAPI(token) {
    // Create Fetch API request
// @ts-ignore
    const url:string = '/api/getPacks/';
        // Create XMLHttpRequest request GET
        const data:Object = {
            // @ts-ignore
            token: token
        };

       $.post(url, data , (response) => {
           if (response !== false) {
               for (let i: number = 0; i < response.length; i++) {
                   let pack: any = response[i];
                   $('.allPacks').append(`
                    <div class = "pack" data-attr="${pack}">
                        <div class = "packFace">
                        <img class="openPack" src="${packVisual(pack)}">
                    </div> 
                    </tr>
                `);
               }
               if (response.length === 0) {
                   window.location.href = '/shop';
               }
               } else {
               window.location.href = '/profile';
           }
       });
}

$(document).click((e) => {
    // @ts-ignore
    if (e.target.classList.contains('openPack')) {
        // @ts-ignore
        deletePackFromDB(e.target.parentNode.parentNode.getAttribute('data-attr'));
        clearPacks();

        // @ts-ignore
        animationBoosters(e.target.parentNode.parentNode.getAttribute('data-attr'));

        // @ts-ignore
        drawPokemons(e.target.parentNode.parentNode.getAttribute('data-attr'))
    }


    // When all cards are drawn, show the button to return the packs
    $('.toFlip').click(() => {
        if (document.querySelectorAll('.toFlip').length - 1 === 0 && document.querySelectorAll('.carte').length === 5) {
            // @ts-ignore
            $('.returnToPacks').css('display', 'block');
        }
    });
});


$(document).mouseover((e) => {
    // @ts-ignore
    if (e.target.classList.contains("arriere") || e.target.classList.contains("openPack")) {
        // @ts-ignore
        e.target.style.cursor = "pointer";
    }
});


function animationBoosters(packType) {
    div.style.height = "100vh";

    $('.allPacks').append( `
                    <div id="pack-opened" class="col-xs-12 open">
                        <div class="pack-content" style="display: block !important; visibility: visible !important;" >
                            <div class="pack-flash">
                                <div class="pack-flash-pack" >
                                    <img class="front" src="` + packVisual(packType) + ` " > 
                                    <div class="top">
                                        <img src="https://i.imgur.com/b1qmOW6.png">
                                        <div class="cut"> 
                                            <img src="https://i.imgur.com/k55nnYY.png">
                                        </div>
                                        <span> 
                                            <img src="https://i.imgur.com/JqedAsJ.png">
                                               <span>
                                                <img src="https://i.imgur.com/WWRXjri.png">
                                                    <span>
                                                        <img src="https://i.imgur.com/DzEYvSP.png" style="width: 81px"> 
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);

    setTimeout(clearPacks, 2700);
}


function generatePacks(packType) {
    packType = packType.toLowerCase();


    $('.allPacks').append(`
            <div class = "pack" data-attr="${packType}">
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
            </div>`);

}

function generateCards(pokemonsDrawed) {
    $('.allCards').empty();
    for (let i = 0; i < pokemonsDrawed.length; i++) {
        let pokemonImage = pokemonsDrawed[i]['images']['large'];
        let pokemonName = pokemonsDrawed[i]['name'];

        // Add card to database
        // @ts-ignore
        let token = checkCookie();
        // For each card in the array
        // @ts-ignore
        let url = 'api/saveCards';

        const data: Object = {
            cardId: pokemonsDrawed[i].id,
            token: token
        };
        $.post(url, data , (response) => {
            if (response === false) {
                alert('Problem while saving cards');
            }
        });

        $('.allCards').append(`
            <div class = "carte" data-attr="${pokemonName}">
                <div class = "double-face">
                <div class = "face">
                <img class="imgPokemon" src="${pokemonImage}"></div> 
                <div class = "arriere toFlip">
            </div>`);
    }
}

//  Vider la div allPacks
function clearPacks() {
    $('.allPacks').empty();
}

function clearCards() {
    $('.allCards').empty();
}

function drawPokemons(type) {
    let saved = false;
    type = type.toLowerCase();

    let pokemonsDrawed = [];

    if (pokemonsDrawed.length !== 5 && $('.carte').length === 0) {
        setTimeout(() => {
            $('.allPacks').append(`<div class='center-on-page'><div class='pokeball'><div class='pokeball__button'></div></div></div>`)
        }, 2700);
        // Get out of the interval
    }


    for (let i = -1; i < 5; i++) {
        // If type = Colorless, randomPage could go only to page 7
        let pokemons = [];
        let pokeCardURL: string
        let randomPage = numberPage(type);

        if (type !== 'random') {
            pokeCardURL = `https://api.pokemontcg.io/v2/cards?q=types:${type}&page=${randomPage}`;
        } else {
            pokeCardURL = `https://api.pokemontcg.io/v2/cards?page=${randomPage}`;
        }

        $.get(pokeCardURL, (data) => {
            // Sort through per card per pokemon name
            // @ts-ignore
            for (let x = 0; x < data.data.length; x++) {
                pokemons.push(data.data[x]);
            }

            if (pokemonsDrawed.length === 5 && $('.carte').length === 0) {
                div.style.height = null;
                clearPacks();
                generateCards(pokemonsDrawed);
            } else {
                let randomPokemon = Math.floor(Math.random() * pokemons.length);
                // @ts-ignore
                if (pokemonsDrawed.includes(pokemons[randomPokemon])) {
                    i--;
                } else if (pokemons[randomPokemon] != undefined) {
                    pokemonsDrawed.push(pokemons[randomPokemon]);
                }
            }
        });
    }
}


$(document).click((e) => {

    // If the card is backward and that no card has been turned yet
    // @ts-ignore
    if (e.target.classList.contains('arriere')) {
        // @ts-ignore
        e.target.classList.remove('toFlip');
        // @ts-ignore
        e.target.style.display = 'block';
        // Make an effect of rotation and disappear and make appear face


        // Flip the card
        // @ts-ignore
        flip(e.target.parentNode);
    }
});

$('.returnToPacks').click( () => {

    clearCards();
    // Go to the top of the page
    // @ts-ignore
    generatePacksFromAPI(checkCookie());
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $('.returnToPacks').css('display', 'none');

})

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


function packVisual(packType) {

    // @TODO : Get the length of the file that contains our images for our pack
    // @TODO : Get random number between 1 and the length of the file
    // @TODO : Get the image from the random number

    let randomImage = 0
    if (packType === 'colorless' || packType === 'dragon' || packType === 'lightning') {
        randomImage = Math.ceil(Math.random() * 4);
    } else if (packType === 'darkness' || packType === 'fairy' || packType === 'metal' || packType === 'psychic') {
        randomImage = Math.ceil(Math.random() * 2);
    } else if (packType === 'fighting') {
        randomImage = Math.ceil(Math.random() * 3);
    }else if (packType === 'fire' || packType === 'grass') {
        randomImage = Math.ceil(Math.random() * 6);
    } else if (packType === 'random') {
        randomImage = Math.ceil(Math.random() * 12);
    } else if (packType === 'water') {
        randomImage = Math.ceil(Math.random() * 10);
    }

    return `./img/packart/${packType}/${randomImage}.jpg`


}

function deletePackFromDB(packType) {
    // @ts-ignore
    let token = checkCookie();
    const url = 'http://localhost:8080/api/deletePack';
    const data = {
        token: token,
        packType: packType
    }

    $.post(url, data, (response) => {
        if (response == 4 && response == 200) {
            // If response is true, redirect to login page
            if (response !== 'false') {

            } else {
                // If response is false, show error message
                alert("This pack doesn't exist in this databse");
            }
        }
    });
}