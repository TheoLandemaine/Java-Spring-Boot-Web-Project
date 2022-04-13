$('#edit').on('click', function () {
    window.location.href = '/edit';
});
$('#modifyPassword').on('click', function () {
    window.location.href = '/modifyPassword';
});
$('#delete').on('click', function () {
    window.location.href = '/delete';
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
        $('#popupConfirmSell').addClass('confirmSellContainer');
        $('#popupConfirmSell').append("\n            <div class=\"confirmSell\">\n                <h2>Are you sure you want to sell this card?</h2>\n                <button type=\"button\" class=\"yes\">Yes</button>\n                <button type=\"button\" class=\"no\">No</button>\n            </div>\n        ");
        $('.yes').on('click', function () {
            sellCards(cardId_1, cardType_1);
        });
        $('.no').on('click', function () {
            $('#popupConfirmSell').removeClass('confirmSellContainer');
            $('#popupConfirmSell').empty();
        });
    }
});
function sellCards(cardId, cardType) {
    //@ts-ignore
    var token = checkCookie();
    var url = 'api/deleteCard';
    var data = {
        token: token,
        cardId: cardId,
        cardType: cardType
    };
    $.post(url, data, function (response) {
        console.log(response);
        if (response !== false) {
            //@ts-ignore
            // Refresh the page
            window.location.href = '/profile';
        }
        else {
            alert('Error while deleting the card');
        }
    });
}
function generateCardsFromAPI(token) {
    // Create Fetch API request
    // @ts-ignore
    var url = '/api/getCards';
    // Create XMLHttpRequest request GET
    var data = {
        // @ts-ignore
        token: token
    };
    $.post(url, data, function (response) {
        if (response !== false) {
            var _loop_1 = function (i) {
                var cardId = response[i];
                var urlAPI = 'https://api.pokemontcg.io/v2/cards/?q=id:' + cardId;
                $.get(urlAPI, function (response2) {
                    var card = response2;
                    $('.allCards').append("\n                    <div class = \"card\" data-type=\"".concat(card.data[0].rarity, "\" data-id=\"").concat(cardId, "\">\n                        <div class=\"cardsBtn\">\n                            <img src=\"").concat(card.data[0].images['small'], "\" alt=\"").concat(card.name, "\">\n                            <button class=\"btn_sell\">Sell card</button>\n                        </div>\n                    </div>\n                    "));
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
