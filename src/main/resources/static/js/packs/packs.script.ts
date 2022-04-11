// @ts-ignore

// Récupérer tous les pokemons à partir de l'api https://api.pokemontcg.io/v2/cards et les stocker dans un tableau


// Au chargement du document en jquery
$(document).ready(() => {
    // drawRandomPokemons();
    //generatePacksFromAPI();

    generatePacksArtificially();
});

function generatePacksFromAPI(token) {
    // Create Fetch API request
// @ts-ignore
    const url:string = 'http://localhost:8080/api/getPacks';
        // Create XMLHttpRequest request GET
        var xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Clear div
                var div: HTMLDivElement = document.querySelector(`.allPacks`)[0] as HTMLDivElement;
                div.innerHTML = '';

                for (var i: number = 0; i < JSON.parse(xhr.responseText).length; i++) {
                    var pack: any = JSON.parse(xhr.responseText)[i];
                    div.innerHTML += `
                    <div class = "pack" data-attr="${pack.p_type}">
                        <div class = "packFace">
                        <img  class="openPack" src="${packVisual(pack.p_type)}">
                    </div> 
                    </tr>
                `;
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.send();

}

function generatePacksArtificially() {
    for (let i = 0; i < 3; i++) {

        generatePacks('colorless');
        generatePacks('fire');
        generatePacks('grass');
        generatePacks('random');

    }





    //
}

$(document).click((e) => {
    // @ts-ignore
    if (e.target.classList.contains('openPack')) {
        clearPacks();
        // @ts-ignore
       drawPokemons(e.target.parentNode.parentNode.getAttribute('data-attr'))
    }


    // When all cards are drawn, show the button to return the packs
    $('.toFlip').click( () => {
        //console.log($('.toFlip').length - 1);
        //console.log($('.carte').length);
    if (document.querySelectorAll('.toFlip').length -1 === 0 && document.querySelectorAll('.carte').length === 5) {
        // @ts-ignore
            // @ts-ignore
            $('.returnToPacks').css('display', 'block');
    }
    })

    $('.returnToPacks').click( () => {

        clearCards();
        // Go to the top of the page
        generatePacksArtificially();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        $('.returnToPacks').css('display', 'none');

    })
});


$(document).mouseover((e) => {
    // @ts-ignore
    if (e.target.classList.contains("arriere") || e.target.classList.contains("openPack")) {
        // @ts-ignore
        e.target.style.cursor = "pointer";
    }
});


function generatePacks(packType) {
    packType = packType.toLowerCase();


    $('.allPacks').append(`
            <div class = "pack" data-attr="${packType}">
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
            </div>`);

}

//  Vider la div allPacks
function clearPacks() {
    $('.allPacks').empty();
}

function clearCards() {
    $('.allCards').empty();
}

function drawPokemons(type) {
    type = type.toLowerCase();

        let pokemonsDrawed = [];

        for (let i = 0; i < 5; i++) {
            // If type = Colorless, randomPage could go only to page 7

            let pokemons = [];
            let pokeCardURL = '';
            let randomPage = numberPage(type);
            if (type !== 'random') {
                pokeCardURL = `https://api.pokemontcg.io/v2/cards?q=types:${type}&page=${randomPage}`;
                //console.log(" page : " + randomPage);
            } else {

                pokeCardURL = `https://api.pokemontcg.io/v2/cards?page=${randomPage}`;
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
                if ($('.carte').length != 5 && $('.pack').length === 0) {
                //console.log(randomPage);
                if (pokemonsDrawed.length < 5) {
                    console.log("Page " + randomPage + " " + pokemons[0]['name']);
                    let random = Math.floor(Math.random() * pokemons.length);
                    //console.log("COUCOU : " + i + " " + pokemons[random]['name']);
                    //console.log("COUCOU : " + i + " " + pokemons[random]['images']['large']);

                    let pokemonImage = pokemons[random]['images']['large'];
                    let pokemonName = pokemons[random]['name'];
                    //console.log(pokemonImage);
                    $('.allCards').append(`
            <div class = "carte" data-attr="${pokemonName}">
                <div class = "double-face">
                <div class = "face">
                <img class="imgPokemon" src="${pokemonImage}"></div> 
                <div class = "arriere toFlip">
            </div>`);

                    pokemonsDrawed.push(pokemons[random]);
                   // console.log("Pokemons eu : " + pokemonsDrawed[i]['name']);
                    //console.log($('.toFlip').length);
                }
        }
            }, 3500);
    }
        saveCards(pokemonsDrawed);
        console.log(pokemonsDrawed);
}


$(document).click((e) => {

    // If the card is backward and that no card has been turned yet
    // @ts-ignore
    if (e.target.classList.contains('arriere')) {
        console.log('coucou')
        // @ts-ignore
        e.target.classList.remove('toFlip');
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
        console.log(randomPage);
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

function saveCards(cards) {
    // Get the token of the user
    let token = localStorage.getItem('token');
    // For each card in the array
    // @ts-ignore
        const data = new FormData();
    for (let card = 0; card < cards.length; card++) {
        data.append("card", cards[card]);
        data.append("token", token);

    }


    const xhr:XMLHttpRequest = new XMLHttpRequest();
    const url: string = 'http://localhost:8080/api/saveCards';

    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // If response is true, redirect to login page
            if (xhr.responseText !== 'false') {
                // Create cookie and stock result in him
                document.cookie = 'token=' + xhr.responseText;

                window.location.href = './login';
            } else {
                // If response is false, show error message
                alert('Username already exists');
            }
        }
    };
    xhr.send(data);
}
