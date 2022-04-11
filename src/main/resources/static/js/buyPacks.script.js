$(document).ready(function () {
    generateAllPacks();
});
$(document).click(function (e) {
    // @ts-ignore
    if (e.target.classList.contains('openPack')) {
        $('.allPacks').empty();
        // @ts-ignore
        console.log(e.target.parentNode.parentNode.getAttribute('data-attr'));
        // @ts-ignore
        generateBigPreview(e.target.parentNode.parentNode.getAttribute('data-attr'));
    }
    // @ts-ignore
    if (e.target.classList.contains('closePack')) {
        $('.allPacks').empty();
        generateAllPacks();
    }
    // @ts-ignore
    if (e.target.classList.contains('buyPack')) {
        // @ts-ignore
        buyPack(e.target.parentNode.parentNode.getAttribute('data-attr'), e.target.parentNode.parentNode.getAttribute('data-price'));
    }
});
// When we mouseover on a pack
$(document).mouseover(function (e) {
    // @ts-ignore
    if (e.target.classList.contains('openPack')) {
        console.log('coucou');
        // @ts-ignore
        e.target.style.cursor = 'pointer';
    }
});
function generateAllPacks() {
    generatePacks('random');
    generatePacks('water');
    generatePacks('fire');
    generatePacks('grass');
    generatePacks('colorless');
    generatePacks('dragon');
    generatePacks('lightning');
    generatePacks('darkness');
    generatePacks('fairy');
    generatePacks('metal');
    generatePacks('psychic');
    generatePacks('fighting');
}
function generatePacks(packType) {
    packType = packType.toLowerCase();
    $('.allPacks').append("\n            <div class = \"pack\" data-attr=\"".concat(packType, "\">\n                <div class = \"packFace\">\n                <img  class=\"openPack\" src=\"").concat(packVisual(packType), "\">\n                </div> \n             <h2>Pack : ").concat(packName(packType), "</h2>\n             <h2>").concat(packPrice(packType), " \u20BD</h2>\n\n            </div>"));
}
function generateBigPreview(packType) {
    packType = packType.toLowerCase();
    $('.allPacks').append("\n            <div class = \"packPreview\" data-attr=\"".concat(packType, "\" data-price=\"").concat(packPrice(packType), "\">\n            <button class=\"closePack\">X</button>\n                <div class = \"packFace\">\n                <img  class=\"openPack\" src=\"").concat(packVisual(packType), "\">\n                </div> \n             <h2>Pack : ").concat(packName(packType), "</h2>\n             <h2>").concat(packPrice(packType), " \u20BD</h2>\n             <button class=\"buyPack\" data-attr=\"").concat(packType, "\">Buy</button>\n            </div>"));
}
function buyPack(packType, packPrice) {
    var xhr = new XMLHttpRequest();
    var data = new FormData();
    data.append('packType', packType);
    data.append('packPrice', packPrice);
    data.append('token', localStorage.getItem('token'));
    var url = 'http://localhost:8080/api/buyPack';
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // If response is true, redirect to login page
            if (xhr.responseText !== 'false') {
                window.location.href = './shop/index.html';
            }
            else {
                // If response is false, show error message
                alert('An error has occured, please try again');
            }
        }
    };
    xhr.send(data);
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
function packName(packType) {
    if (packType === 'colorless') {
        return 'Colorless';
    }
    else if (packType === 'dragon') {
        return 'Dragon';
    }
    else if (packType === 'lightning') {
        return 'Lightning';
    }
    else if (packType === 'darkness') {
        return 'Darkness';
    }
    else if (packType === 'fairy') {
        return 'Fairy';
    }
    else if (packType === 'metal') {
        return 'Metal';
    }
    else if (packType === 'psychic') {
        return 'Psychic';
    }
    else if (packType === 'fighting') {
        return 'Fighting';
    }
    else if (packType === 'fire') {
        return 'Fire';
    }
    else if (packType === 'grass') {
        return 'Grass';
    }
    else if (packType === 'random') {
        return 'Random';
    }
    else if (packType === 'water') {
        return 'Water';
    }
}
function packPrice(packType) {
    if (packType === 'colorless') {
        return '14';
    }
    else if (packType === 'dragon') {
        return '20';
    }
    else if (packType === 'lightning') {
        return '14';
    }
    else if (packType === 'darkness') {
        return '16';
    }
    else if (packType === 'fairy') {
        return '25';
    }
    else if (packType === 'metal') {
        return '18';
    }
    else if (packType === 'psychic') {
        return '13';
    }
    else if (packType === 'fighting') {
        return '12';
    }
    else if (packType === 'fire') {
        return '10';
    }
    else if (packType === 'grass') {
        return '10';
    }
    else if (packType === 'random') {
        return '4';
    }
    else if (packType === 'water') {
        return '10';
    }
}
