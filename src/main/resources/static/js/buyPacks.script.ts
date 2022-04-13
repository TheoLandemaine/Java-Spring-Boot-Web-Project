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


    let url = '/api/getPackPrice';
    let data = {
        packType: packType
    }

    $.post(url, data, (response) => {
        $('.allPacks').append(`
            <div class = "pack" data-attr="${packType}">
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
             <h2>Pack : ${packName(packType)}</h2>
             <h2>${response} ₽</h2>

            </div>`);
    });

}

function generateBigPreview(packType) {
    packType = packType.toLowerCase();

    let url = '/api/getPackPrice';
    let data = {
        packType: packType
    }

    $.post(url, data, (response) => {

        $('.allPacks').append(`
            <div class = "packPreview" data-attr="${packType}" data-price="${response}">
            <button class="closePack">X</button>
                <div class = "packFace">
                <img  class="openPack" src="${packVisual(packType)}">
                </div> 
             <h2>Pack : ${packName(packType)}</h2>
             <h2>${response} ₽</h2>
             <button class="buyPack" data-attr="${packType}">Buy</button>
            </div>`);
    });

}

function buyPack(packType) {
    const url: string = '/api/buyPack';
    let url2 = '/api/getPackPrice';
    let data2 = {
        packType: packType
    }
    $.post(url2, data2, (response2) => {

        let urlCoins = '/api/getUserCoins';
        let dataCoins = {
            // @ts-ignore
            token: checkCookie()
        }
        $.post(urlCoins, dataCoins, (responseCoins) => {

            if (responseCoins >= response2) {
                const data: Object = {
                    packType: packType,
                    packPrice: response2,
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
            } else {
                alert('You do not have enough coins');
                // Redirect to shop
                window.location.href = '/profile';
            }
    });
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


function packName(packType:String) {
    let packName = "";
    for (let i = 0; i < packType.length; i++) {
        if (i === 0) {
            packName += packType[i].toUpperCase();
        } else {
            packName += packType[i].toLowerCase();
        }
    }
        return packName;
}



