$(document).ready(function () {
    generateAllPacks();
});
$(document).click(function (e) {
    // @ts-ignore
    var target = e.target;
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
        buyPack(e.target.parentNode.getAttribute('data-attr'));
    }
});
// When we mouseover on a pack
$(document).mouseover(function (e) {
    var target = e.target;
    if (target.classList.contains('openPack')) {
        target.style.cursor = 'pointer';
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
    var url = '/api/getPackPrice';
    var data = {
        packType: packType
    };
    $.post(url, data, function (response) {
        $('.allPacks').append("\n            <div class = \"pack\" data-attr=\"".concat(packType, "\">\n                <div class = \"packFace\">\n                <img  class=\"openPack\" src=\"").concat(packVisual(packType), "\">\n                </div> \n             <h2>Pack : ").concat(packName(packType), "</h2>\n             <h2>").concat(response, " \u20BD</h2>\n\n            </div>"));
    });
}
function generateBigPreview(packType) {
    packType = packType.toLowerCase();
    var url = '/api/getPackPrice';
    var data = {
        packType: packType
    };
    $.post(url, data, function (response) {
        $('.allPacks').append("\n            <div class = \"packPreview\" data-attr=\"".concat(packType, "\" data-price=\"").concat(response, "\">\n            <button class=\"closePack\">X</button>\n                <div class = \"packFace\">\n                <img  class=\"openPack\" src=\"").concat(packVisual(packType), "\">\n                </div> \n             <h2>Pack : ").concat(packName(packType), "</h2>\n             <h2>").concat(response, " \u20BD</h2>\n             <button class=\"buyPack\" data-attr=\"").concat(packType, "\">Buy</button>\n            </div>"));
    });
}
function buyPack(packType) {
    // @ts-ignore
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, buy!'
    }).then(function (result) {
        if (result.isConfirmed) {
            var url_1 = '/api/buyPack';
            var url2 = '/api/getPackPrice';
            var data2 = {
                packType: packType
            };
            $.post(url2, data2, function (response2) {
                var urlCoins = '/api/getUserCoins';
                var dataCoins = {
                    // @ts-ignore
                    "token": checkCookie()
                };
                $.post(urlCoins, dataCoins, function (responseCoins) {
                    if (responseCoins >= response2) {
                        var data_1 = {
                            packType: packType,
                            packPrice: response2,
                            // @ts-ignore
                            token: checkCookie()
                        };
                        $.post(url_1, data_1, function (response) {
                            // If response is true, redirect to login page
                            if (response !== false) {
                                // Create Swal.fire popup with success message and two buttons : Buy another pack and Go to my packs
                                // @ts-ignore
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You bought a pack!',
                                    icon: 'success',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Buy another pack',
                                    cancelButtonText: 'Go to my packs'
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        window.location.href = '/shop';
                                    }
                                    else {
                                        window.location.href = '/myPacks';
                                    }
                                });
                            }
                            else {
                                // @ts-ignore
                                Swal.fire({
                                    icon: 'error',
                                    title: 'An error has occured, please try again',
                                    confirmButtonText: 'Reload'
                                }).then(function (result) {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            }
                        });
                    }
                    else {
                        // @ts-ignore
                        Swal.fire({
                            icon: 'error',
                            title: 'You do not have enough coins',
                            confirmButtonText: 'Back to shop'
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                window.location.href = '/shop';
                            }
                        });
                    }
                });
            });
        }
    });
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
    var packName = "";
    for (var i = 0; i < packType.length; i++) {
        if (i === 0) {
            packName += packType[i].toUpperCase();
        }
        else {
            packName += packType[i].toLowerCase();
        }
    }
    return packName;
}
