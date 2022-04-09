// @ts-ignore
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Récupérer tous les pokemons à partir de l'api https://api.pokemontcg.io/v2/cards et les stocker dans un tableau
// Au chargement du document en jquery
$(document).ready(function () {
    // drawRandomPokemons();
    generatePacksArtificially();
});
function generatePacksArtificially() {
    for (var i = 0; i < 3; i++) {
        generatePacks('colorless');
        generatePacks('fire');
        generatePacks('grass');
        generatePacks('random');
    }
}
$(document).click(function (e) {
    // @ts-ignore
    if (e.target.classList.contains('openPack')) {
        clearPacks();
        // @ts-ignore
        drawPokemons(e.target.parentNode.parentNode.getAttribute('data-attr'));
    }
    // When all cards are drawn, show the button to return the packs
    $('.toFlip').click(function () {
        //console.log($('.toFlip').length - 1);
        //console.log($('.carte').length);
        if (document.querySelectorAll('.toFlip').length - 1 === 0 && document.querySelectorAll('.carte').length === 5) {
            // @ts-ignore
            // @ts-ignore
            $('.returnToPacks').css('display', 'block');
        }
    });
    $('.returnToPacks').click(function () {
        clearCards();
        generatePacksArtificially();
        $('.returnToPacks').css('display', 'none');
    });
});
$(document).mouseover(function (e) {
    // @ts-ignore
    if (e.target.classList.contains("arriere") || e.target.classList.contains("openPack")) {
        // @ts-ignore
        e.target.style.cursor = "pointer";
    }
});
function generatePacks(packType) {
    packType = packType.toLowerCase();
    $('.allPacks').append("\n            <div class = \"pack\" data-attr=\"".concat(packType, "\">\n                <div class = \"packFace\">\n                <img  class=\"openPack\" src=\"").concat(packVisual(packType), "\">\n                </div> \n            </div>"));
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
    var pokemonsDrawed = [];
    var _loop_1 = function (i) {
        // If type = Colorless, randomPage could go only to page 7
        var pokemons = [];
        var pokeCardURL = '';
        var randomPage = numberPage(type);
        if (type !== 'random') {
            pokeCardURL = "https://api.pokemontcg.io/v2/cards?q=types:".concat(type, "&page=").concat(randomPage);
            //console.log(" page : " + randomPage);
        }
        else {
            pokeCardURL = "https://api.pokemontcg.io/v2/cards?page=".concat(randomPage);
        }
        fetch(pokeCardURL, {
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
            // Sort through per card per pokemon name
            // @ts-ignore
            for (x = 0; x < data.data.length; x++) {
                // @ts-ignore
                // @ts-ignore
                pokemons.push(data.data[x]);
            }
        });
        setInterval(function () {
            if ($('.carte').length != 5 && $('.pack').length === 0) {
                //console.log(randomPage);
                if (pokemonsDrawed.length < 5) {
                    console.log("Page " + randomPage + " " + pokemons[0]['name']);
                    var random = Math.floor(Math.random() * pokemons.length);
                    //console.log("COUCOU : " + i + " " + pokemons[random]['name']);
                    //console.log("COUCOU : " + i + " " + pokemons[random]['images']['large']);
                    var pokemonImage = pokemons[random]['images']['large'];
                    var pokemonName = pokemons[random]['name'];
                    //console.log(pokemonImage);
                    $('.allCards').append("\n            <div class = \"carte\" data-attr=\"".concat(pokemonName, "\">\n                <div class = \"double-face\">\n                <div class = \"face\">\n                <img class=\"imgPokemon\" src=\"").concat(pokemonImage, "\"></div> \n                <div class = \"arriere toFlip\">\n            </div>"));
                    pokemonsDrawed.push(pokemons[random]);
                    // console.log("Pokemons eu : " + pokemonsDrawed[i]['name']);
                    //console.log($('.toFlip').length);
                }
            }
        }, 3500);
    };
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
}
$(document).click(function (e) {
    // If the card is backward and that no card has been turned yet
    // @ts-ignore
    if (e.target.classList.contains('arriere')) {
        console.log('coucou');
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
function flip(card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Put the class that will permit to flip the card and play the sound
            // Cibler l'enfant de la card
            // @ts-ignore
            card.classList.toggle("active");
            return [2 /*return*/];
        });
    });
}
function numberPage(type) {
    var randomPage = 0;
    if (type === 'colorless') {
        randomPage = Math.ceil(Math.random() * 7);
    }
    else if (type === 'darkness') {
        randomPage = Math.ceil(Math.random() * 4);
    }
    else if (type === 'dragon') {
        randomPage = Math.ceil(Math.random() * 2);
    }
    else if (type === 'fairy') {
        randomPage = 1;
    }
    else if (type === 'fighting') {
        randomPage = Math.ceil(Math.random() * 6);
    }
    else if (type === 'fire') {
        randomPage = Math.ceil(Math.random() * 6);
    }
    else if (type === 'grass') {
        randomPage = Math.ceil(Math.random() * 8);
        console.log(randomPage);
    }
    else if (type === 'lightning') {
        randomPage = Math.ceil(Math.random() * 5);
    }
    else if (type === 'metal') {
        randomPage = Math.ceil(Math.random() * 3);
    }
    else if (type === 'psychic') {
        randomPage = Math.ceil(Math.random() * 7);
    }
    else if (type === 'random') {
        randomPage = Math.ceil(Math.random() * 59);
    }
    else if (type === 'water') {
        randomPage = Math.ceil(Math.random() * 8);
    }
    return randomPage;
}
function packVisual(packType) {
    // @TODO : Get the length of the file that contains our images for our pack
    // @TODO : Get random number between 1 and the length of the file
    // @TODO : Get the image from the random number
    var randomImage = 0;
    if (packType === 'colorless' || packType === 'dragon' || packType === 'lightning') {
        randomImage = Math.ceil(Math.random() * 4);
    }
    else if (packType === 'darkness' || packType === 'fairy' || packType === 'metal' || packType === 'psychic') {
        randomImage = Math.ceil(Math.random() * 2);
    }
    else if (packType === 'fighting') {
        randomImage = Math.ceil(Math.random() * 3);
    }
    else if (packType === 'fire' || packType === 'grass') {
        randomImage = Math.ceil(Math.random() * 6);
    }
    else if (packType === 'random') {
        randomImage = Math.ceil(Math.random() * 12);
    }
    else if (packType === 'water') {
        randomImage = Math.ceil(Math.random() * 10);
    }
    return "./img/packart/".concat(packType, "/").concat(randomImage, ".jpg");
}
