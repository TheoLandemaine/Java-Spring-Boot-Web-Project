$('#edit').on('click', function () {
    window.location.href = '/edit';
});
$('#modifyPassword').on('click', function () {
    window.location.href = '/modifyPassword';
});
$('#delete').on('click', function () {
    // @ts-ignore
    Swal.fire({
        title: "Are you sure to delete your account ?",
        text: "You won't be able to revert this !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(function (result) {
        if (result.isConfirmed) {
            deleteAccount();
        }
    });
});
$('#myPacks').on('click', function () {
    window.location.href = '/myPacks';
});
$('#logout').on('click', function () {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
});
//
// const myCards = document.querySelector('#myCards');
// myCards.addEventListener("click", function (e) {
//     window.location.href = '/myCards';
// });
$(document).ready(function () {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});
function sellCard(cardType, cardId) {
    //@ts-ignore
    var token = checkCookie();
    var url = 'api/deleteCard';
    var data = {
        token: token,
        cardId: cardId,
        cardType: cardType
    };
    $.post(url, data, function (response) {
        if (response === true) {
            $("#".concat(cardId)).remove();
            var actualCoins_1 = parseInt($("#actualCoins").text());
            $("#actualCoins").text("Updating...");
            // @ts-ignore
            $.post('/api/getUserCoins', { 'token': checkCookie() }, function (data) {
                $('#actualCoins').text("".concat(data));
                // @ts-ignore
                Swal.fire("Sold! +".concat(parseInt(data) - actualCoins_1, " coins"), 'Your card has been sold.', 'success');
            });
        }
        else {
            // @ts-ignore
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    });
}
//When we click on the page
$(document).on('click', function (e) {
    //Start the function
    // @ts-ignore
    var target = e.target;
    if (target.classList.contains('btn_sell')) {
        var cardType_1 = target.parentNode.parentNode.getAttribute('data-type');
        var cardId_1 = target.parentNode.parentNode.getAttribute('data-id');
        // console.log(cardType);
        // console.log(cardId);
        $.post('/api/getCardPrice', { 'cardType': cardType_1 }, function (response) {
            // @ts-ignore
            Swal.fire({
                title: "Are you sure to sell this card\n".concat(response, " coins ?"),
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, sell it!'
            }).then(function (result) {
                if (result.isConfirmed) {
                    sellCard(cardType_1, cardId_1);
                }
            });
        });
    }
});
function generateCardsFromAPI(token) {
    // Create Fetch API request
    var url = '/api/getCards';
    // Create XMLHttpRequest request GET
    var data = {
        "token": token
    };
    $.post(url, data, function (response) {
        if (response !== false) {
            var _loop_1 = function (i) {
                var cardId = response[i];
                var urlAPI = "https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/cards/en/".concat(cardId.split('-')[0], ".json");
                $.get(urlAPI, function (response) {
                    var card = JSON.parse(response);
                    // Check if the card (with id) is in the card Object
                    for (var i_1 = 0; i_1 < card.length; i_1++) {
                        if (card[i_1].id === cardId) {
                            var rarity = card[i_1].rarity;
                            var image = card[i_1].images['small'];
                            $('.allCards').append("\n                                <div class=\"card\" id=\"".concat(cardId, "\" data-type=\"").concat(rarity.toLowerCase(), "\" data-id=\"").concat(cardId, "\">\n                                    <div class=\"cardsBtn\">\n                                        <img src=\"").concat(image, "\" alt=\"").concat(cardId, "\">\n                                        <button class=\"btn_sell\">Sell card</button>\n                                    </div>\n                                </div>\n                            "));
                            break;
                        }
                    }
                });
            };
            for (var i = 0; i < response.length; i++) {
                _loop_1(i);
            }
        }
        else {
            alert('Vous n\'avez pas de pack, veuillez en acheter');
            window.location.href = '/shop';
        }
    });
}
function deleteAccount() {
    var url = '/api/deleteAccount';
    var data = {
        // @ts-ignore
        'token': checkCookie()
    };
    $.post(url, data, function (response) {
        if (response !== false) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/register';
        }
        else {
            alert('Error while deleting your account');
        }
    });
}
