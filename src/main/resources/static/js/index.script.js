var searchButton1 = document.getElementById("search-button");
var resultsContainer = document.getElementById("pokeResults");
var currentSelect = document.getElementById("pokeSelect");
var selectRarity = document.getElementById("rarity-search");
var selectType = document.getElementById("type-search");
var cardsOnPage = document.getElementsByClassName("resultsImage");
var nameSearch1 = document.getElementById("name-input");
//Instantiate View Card Modal
var modal = document.getElementById("myModal");
var modalCardName = document.getElementById("modal-card-name");
var normalPrice = document.getElementById("modal-normal-price");
var modalCardImage = document.getElementById("modal-card-image");
var cardSaveBtn = document.getElementById("card-saver");
// Get the <span> element that closes the modal [This is just w3Schools basic modal setup]
var cardDisplayClose = document.getElementsByClassName("close")[0];
var collectionsDisplayClose = document.getElementsByClassName("close")[1];
// Instantiate Collections Modal
var collectionsModal = document.getElementById("collections-modal");
var collectionResults = document.getElementById("collection-results");
var savedCardsBtn1 = document.getElementById("show-saved");
var divResult = document.querySelector('#pokeResults');
// Saved Cards Array
var collectedCards = [];
var savedCollectedCards = localStorage.getItem("ItemID");
if (savedCollectedCards !== null) {
    collectedCards = JSON.parse(savedCollectedCards);
}
// Function that returns both the name and parameter search inputs
function searchingPokeData(TheRarity, theType, name) {
    // Sorted
    // Check to see if there is a type and rarity being searched
    if (TheRarity && theType && name) {
        var fullURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20rarity:" + TheRarity + "%20types:" + theType;
        fetch(fullURL)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Sorted
        // Check to see if there is only a Rarity being searched
    }
    else if (TheRarity && theType && !name) {
        var rarityTypeURL = "https://api.pokemontcg.io/v2/cards?q=rarity:" + TheRarity + "%20types:" + theType;
        fetch(rarityTypeURL)
            .then(function (response) {
            return response.json();
            // return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Sorted
        // Check to see if there is only a Rarity being searched
    }
    else if (name && TheRarity && !theType) {
        var nameRarityURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20rarity:" + TheRarity;
        fetch(nameRarityURL)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Sorted
        // Check to see if there is only a type being searched
    }
    else if (name && theType && !TheRarity) {
        var nameTypeURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name + "%20types:" + theType;
        fetch(nameTypeURL)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Sorted
        // Check to see if there is only a type being searched
    }
    else if (TheRarity && !theType && !name) {
        var rarityURL = "https://api.pokemontcg.io/v2/cards?q=rarity:" + TheRarity;
        fetch(rarityURL)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Sorted
        // Check to see if there is only a type being searched
    }
    else if (theType && !TheRarity && !name) {
        var typeCardURL = "https://api.pokemontcg.io/v2/cards?q=types:" + theType;
        fetch(typeCardURL)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            // chargement();
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
        // Non Sorted
        // Check if there was a name inputed
    }
    else if (name) {
        var nameURL = "https://api.pokemontcg.io/v2/cards?q=name:" + name;
        console.log("test 1");
        fetch(nameURL)
            .then(function (response) {
            console.log("test");
            return response.json();
        })
            .then(function (data) {
            postPokemonCardInfo(data.data);
            if (document.querySelectorAll('.resultsImage').length == 0) {
                document.querySelector('#pokeResults').innerHTML = "<h2 class='titleNoCard'>No card matches your search</h2>";
                divResult.style.display = 'flex';
                divResult.style.flexDirection = 'column';
                divResult.style.justifyContent = 'center';
            }
            else {
                divResult.style.display = 'block';
            }
        });
    }
}
// Takes the TCG data and pulls individual card data
// Sets the card id as the actual html item id
function postPokemonCardInfo(dataTCG) {
    for (var i = 0; i < dataTCG.length; i++) {
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
    var clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject;
    fetch(clickCardURL, {
        method: "GET",
        // @ts-ignore
        withCredentials: true,
        headers: {
            "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
            "Content-Type": "application/json"
        }
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
        }
        else {
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
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var parameterType = urlParams.get("type");
    var parameterRarity = urlParams.get("rarity");
    var searchedName = urlParams.get("name").toLowerCase();
    searchingPokeData(parameterRarity, parameterType, searchedName);
    resultsContainer.innerHTML = "";
}
// Button click event that passes input info
searchButton1.addEventListener("click", function () {
    var parameterType = recupType(selectType);
    // parameterRarity = selectRarity.value;
    var parameterRarity = recupRarity(selectRarity);
    var searchedName = nameSearch1.value.toLowerCase();
    console.log("test de chargement");
    chargement();
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
    for (var i = 0; i < cardObject.length; i++) {
        var clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject[i];
        fetch(clickCardURL, {
            method: "GET",
            // @ts-ignore
            withCredentials: true,
            headers: {
                "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
                "Content-Type": "application/json"
            }
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
    console.log("début de chargement");
    var chargement = document.querySelector('.chargementCatalog');
    chargement.style.height = "100vh";
    chargement.innerHTML = "<div class='center-on-page'><div class='pokeball'><div class='pokeball__button'></div></div></div>";
    setTimeout(function () {
        $(chargement).empty();
        chargement.style.height = "0vh";
        console.log("fin de chargement");
    }, 3700);
}
var typeTitle = document.getElementsByClassName("typeTitle")[0];
typeTitle.addEventListener("click", function () {
    var body = document.getElementsByTagName('body')[0];
    body.classList.toggle('typeAppear');
});
var rarityTitle = document.getElementsByClassName("rarityTitle")[0];
rarityTitle.addEventListener("click", function () {
    var body = document.getElementsByTagName('body')[0];
    body.classList.toggle('rarityAppear');
});
cardDisplayClose.addEventListener("click", function (e) {
    modal.style.display = "none";
});
collectionsDisplayClose.addEventListener("click", function () {
    collectionsModal.style.display = "none";
});
startPageSearch();
function recupRarity(selectRarity) {
    var rarity = document.getElementsByName('rarity');
    var resultatRarity = "";
    for (var i = 0; i < rarity.length; i++) {
        // @ts-ignore
        if (rarity[i].checked) {
            // @ts-ignore
            resultatRarity += rarity[i].value;
        }
    }
    return resultatRarity;
}
function recupType(selectType) {
    var type = document.getElementsByName('type');
    var resultatType = "";
    for (var i = 0; i < type.length; i++) {
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
