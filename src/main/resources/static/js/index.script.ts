const searchButton1 = document.getElementById("search-button") as HTMLFormElement;
const resultsContainer = document.getElementById("pokeResults") as HTMLFormElement;
const currentSelect = document.getElementById("pokeSelect") as HTMLFormElement;
const selectRarity = document.getElementById("rarity-search") as HTMLFormElement;
const selectType = document.getElementById("type-search") as HTMLFormElement;
const cardsOnPage = document.getElementsByClassName("resultsImage");
const nameSearch1 = document.getElementById("name-input") as HTMLFormElement;

//Instantiate View Card Modal
let modal = document.getElementById("myModal") as HTMLFormElement;
let modalCardName = document.getElementById("modal-card-name") as HTMLFormElement;
let normalPrice = document.getElementById("modal-normal-price") as HTMLFormElement;
let modalCardImage = document.getElementById("modal-card-image") as HTMLFormElement;

let cardSaveBtn = document.getElementById("card-saver") as HTMLFormElement;

// Get the <span> element that closes the modal [This is just w3Schools basic modal setup]
let cardDisplayClose = document.getElementsByClassName("close")[0] as HTMLFormElement;
let collectionsDisplayClose = document.getElementsByClassName("close")[1] as HTMLFormElement;

// Instantiate Collections Modal
let collectionsModal = document.getElementById("collections-modal") as HTMLFormElement;
let collectionResults = document.getElementById("collection-results") as HTMLFormElement;

let savedCardsBtn1 = document.getElementById("show-saved") as HTMLFormElement;
let divResult = document.querySelector('#pokeResults') as HTMLFormElement;


// Saved Cards Array
let collectedCards = [];

let savedCollectedCards = localStorage.getItem("ItemID");

if (savedCollectedCards !== null) {
    collectedCards = JSON.parse(savedCollectedCards);
}

// Function that returns both the name and parameter search inputs
function searchingPokeData(TheRarity, theType, name) {
    // Sorted
    // Check to see if there is a type and rarity being searched

    if (TheRarity && theType && name) {
        const fullURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20rarity:" + TheRarity + "%20types:" + theType;

        fetch(fullURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";

                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }
            });

        // Sorted
        // Check to see if there is only a Rarity being searched
    } else if (TheRarity && theType && !name) {
        const rarityTypeURL = "https://api.pokemontcg.io/v2/cards?q=rarity:" + TheRarity + "%20types:" + theType;

        fetch(rarityTypeURL)
            .then(function (response) {
                return response.json();
                // return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {


                    divResult.style.display = 'block';
                }
            });

        // Sorted
        // Check to see if there is only a Rarity being searched
    } else if (name && TheRarity && !theType) {
        const nameRarityURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20rarity:" + TheRarity;

        fetch(nameRarityURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }
            });

        // Sorted
        // Check to see if there is only a type being searched
    } else if (name && theType && !TheRarity) {
        const nameTypeURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20types:" + theType;

        fetch(nameTypeURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }
            });

        // Sorted
        // Check to see if there is only a type being searched
    } else if (TheRarity && !theType && !name) {
        const rarityURL = "https://api.pokemontcg.io/v2/cards?q=rarity:" + TheRarity;

        fetch(rarityURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);
                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }
            });

        // Sorted
        // Check to see if there is only a type being searched
    } else if (theType && !TheRarity && !name) {
        const typeCardURL = "https://api.pokemontcg.io/v2/cards?q=types:" + theType;

        fetch(typeCardURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }

            });

        // Non Sorted
        // Check if there was a name inputed
    } else if (name) {
        const nameURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name;

        fetch(nameURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                chargement();

                postPokemonCardInfo(data.data);

                if (document.querySelectorAll('.resultsImage').length == 0) {
                    document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                    divResult.style.display = 'flex';
                    divResult.style.flexDirection = 'column';
                    divResult.style.justifyContent = 'center';
                } else {
                    divResult.style.display = 'block';
                }

            });

    }
}

// Takes the TCG data and pulls individual card data
// Sets the card id as the actual html item id
function postPokemonCardInfo(dataTCG) {
    for (let i = 0; i < dataTCG.length; i++) {
        var cardImage = document.createElement("img");
        resultsContainer.appendChild(cardImage);
        cardImage.id = dataTCG[i].id;
        cardImage.setAttribute("class", "resultsImage");
        cardImage.src = dataTCG[i].images.small;

        cardImage.addEventListener("click", function (e) {
            var cardID = this.id;

            cardClickInformation(cardID);
        });
    }
}


// Runs a search query based on the current card you clicked
function cardClickInformation(cardObject) {
    const clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject;

    fetch(clickCardURL, {
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
            cardModalInformation(data.data);
        });
}

// Handles information inside the Card Modal
function cardModalInformation(modalCard) {
    modalCardName.innerHTML = modalCard.name;
    modalCardImage.src = modalCard.images.large;
    cardSaveBtn.setAttribute("class", modalCard.id);

    if (modalCard.tcgplayer) {

        if (modalCard.tcgplayer.prices.normal) {
            normalPrice.innerHTML =
                "Market Price: " + modalCard.tcgplayer.prices.normal.market.toFixed(2);
        } else {
            normalPrice.innerHTML = "Market Price: N/A";
        }
    }
    modal.style.display = "block";
}

// Modal handling
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

    if (event.target == collectionsModal) {
        collectionsModal.style.display = "none";
    }
};

// Handle the event to run a search when the page loads
function startPageSearch() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const parameterType = urlParams.get("type");
    const parameterRarity = urlParams.get("rarity");
    const searchedName = urlParams.get("name").toLowerCase();

    searchingPokeData(parameterRarity, parameterType, searchedName);

    resultsContainer.innerHTML = "";
}

// Button click event that passes input info
searchButton1.addEventListener("click", () => {
    const parameterType = recupType(selectType);
    // parameterRarity = selectRarity.value;
    const parameterRarity = recupRarity(selectRarity);

    const searchedName = nameSearch1.value.toLowerCase();

    searchingPokeData(parameterRarity, parameterType, searchedName);

    resultsContainer.innerHTML = "";
});

// Save Card Functionality
cardSaveBtn.addEventListener("click", function () {
    collectedCards.push(cardSaveBtn.className);
    localStorage.setItem("ItemID", JSON.stringify(collectedCards));
});


// Runs a search query based on the current card you clicked
function getSavedCards(cardObject) {
    collectionResults.innerHTML = "";

    for (let i = 0; i < cardObject.length; i++) {
        const clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject[i];

        fetch(clickCardURL, {
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
                postSavedCards(data.data);
            });
    }
}

function postSavedCards(dataTCG) {
    var collectionImage = document.createElement("img");
    collectionResults.appendChild(collectionImage);
    collectionImage.id = dataTCG.id;
    collectionImage.setAttribute("class", "resultsImage");
    collectionImage.src = dataTCG.images.small;

    collectionImage.addEventListener("click", function (e) {
        var cardID = this.id;
        modal.style.display = "block";
        collectionsModal.style.display = "none";
        cardClickInformation(cardID);
    });
}

function chargement() {
    document.querySelector('#pokeResults').innerHTML = "<div class='center-on-page'><div class='pokeball'><div class='pokeball__button'></div></div></div>";
    let pokeball = document.querySelector('.center-on-page') as HTMLElement;
    setTimeout(() => {
        pokeball.style.display = "none"
    }, 3700);
}

var typeTitle = document.getElementsByClassName("typeTitle")[0];

typeTitle.addEventListener("click", function () {
    let body = document.getElementsByTagName('body')[0];

    body.classList.toggle('typeAppear');

});

var rarityTitle = document.getElementsByClassName("rarityTitle")[0];

rarityTitle.addEventListener("click", function () {
    let body = document.getElementsByTagName('body')[0];

    body.classList.toggle('rarityAppear');

});

cardDisplayClose.addEventListener("click", function (e) {
    modal.style.display = "none";
});

collectionsDisplayClose.addEventListener("click", function () {
    collectionsModal.style.display = "none";
});

startPageSearch();

function recupRarity(selectRarity: HTMLFormElement) {
    let rarity = document.getElementsByName('rarity');
    let resultatRarity = "";
    for (let i = 0; i < rarity.length; i++) {
        // @ts-ignore
        if (rarity[i].checked) {
            // @ts-ignore
            resultatRarity += rarity[i].value;
        }
    }
    return resultatRarity;
}

function recupType(selectType: HTMLFormElement) {
    let type = document.getElementsByName('type');
    let resultatType = "";
    for (let i = 0; i < type.length; i++) {
        // @ts-ignore
        if (type[i].checked) {
            // @ts-ignore
            resultatType += type[i].value;
        }
    }
    return resultatType;
}


// Handle Collections Modal
savedCardsBtn1.addEventListener("click", function (e) {
    collectionsModal.style.display = "block";
    getSavedCards(collectedCards);
});