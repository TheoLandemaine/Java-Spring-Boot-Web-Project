$(document).ready(() => {
    generateAllPacks();
})

$(document).click((e) => {
    // @ts-ignore
    let target = e.target as HTMLElement;
    if (target.classList.contains('openPack')) {
        $('.allPacks').empty();
        // @ts-ignore
        generateBigPreview(e.target.parentNode.parentNode.getAttribute('data-attr'));
    }
    // @ts-ignore
    if (target.classList.contains('closePack')) {
        $('.allPacks').empty();
        generateAllPacks();
    }
    // @ts-ignore
    if (target.classList.contains('buyPack')) {
        // @ts-ignore
        buyPack(e.target.parentNode.getAttribute('data-attr'), parseInt(e.target.parentNode.getAttribute('data-price')));
    }
})


// When we mouseover on a pack
$(document).mouseover((e) => {
    const target = e.target as unknown as HTMLElement;

    if (target.classList.contains('openPack')) {
        target.style.cursor = 'pointer';
    }
})

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


    $('.allPacks').append(`
            <div class = "pack" data-attr="${packType}">
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
             <h2>Pack : ${packName(packType)}</h2>
             <h2>${packPrice(packType)} ₽</h2>

            </div>`);

}

function generateBigPreview(packType) {
    packType = packType.toLowerCase();


    $('.allPacks').append(`
            <div class = "packPreview" data-attr="${packType}" data-price="${packPrice(packType)}">
            <button class="closePack">X</button>
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
             <h2>Pack : ${packName(packType)}</h2>
             <h2>${packPrice(packType)} ₽</h2>
             <button class="buyPack" data-attr="${packType}">Buy</button>
            </div>`);

}

function buyPack(packType, packPrice: Number) {
    const url: string = '/api/buyPack';

    const data: Object = {
        packType: packType,
        packPrice: packPrice,
        // @ts-ignore
        token: checkCookie()
    }

    $.post(url, data, (response) => {
        // If response is true, redirect to login page
        if (response !== false) {
            window.location.href = '/shop';
        } else {
            // If response is false, show error message
            alert('An error has occured, please try again');
        }
    });
}

function packVisual(packType: string) {

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
    } else if (packType === 'fire' || packType === 'grass') {
        randomImage = Math.ceil(Math.random() * 6);
    } else if (packType === 'random') {
        randomImage = Math.ceil(Math.random() * 12);
    } else if (packType === 'water') {
        randomImage = Math.ceil(Math.random() * 10);
    }

    return `./img/packart/${packType}/${randomImage}.jpg`


}

function packName(packType: string) {
    if (packType === 'colorless') {
        return 'Colorless';
    } else if (packType === 'dragon') {
        return 'Dragon';
    } else if (packType === 'lightning') {
        return 'Lightning';
    } else if (packType === 'darkness') {
        return 'Darkness';
    } else if (packType === 'fairy') {
        return 'Fairy';
    } else if (packType === 'metal') {
        return 'Metal';
    } else if (packType === 'psychic') {
        return 'Psychic';
    } else if (packType === 'fighting') {
        return 'Fighting';
    } else if (packType === 'fire') {
        return 'Fire';
    } else if (packType === 'grass') {
        return 'Grass';
    } else if (packType === 'random') {
        return 'Random';
    } else if (packType === 'water') {
        return 'Water';
    }
}

function packPrice(packType) {
    if (packType === 'colorless') {
        return '14';
    } else if (packType === 'dragon') {
        return '20';
    } else if (packType === 'lightning') {
        return '14';
    } else if (packType === 'darkness') {
        return '16';
    } else if (packType === 'fairy') {
        return '25';
    } else if (packType === 'metal') {
        return '18';
    } else if (packType === 'psychic') {
        return '13';
    } else if (packType === 'fighting') {
        return '12';
    } else if (packType === 'fire') {
        return '10';
    } else if (packType === 'grass') {
        return '10';
    } else if (packType === 'random') {
        return '4';
    } else if (packType === 'water') {
        return '10';
    }
}

