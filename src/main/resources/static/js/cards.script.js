$(document).ready(function () {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});
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
            for (var i = 0; i < response.length; i++) {
                var cardId = response[i];
                var urlAPI = 'https://api.pokemontcg.io/v2/cards/?q=id:' + cardId;
                $.get(urlAPI, function (response2) {
                    var card = response2;
                    $('.allCards').append("\n                    <div class = \"card\" data-attr=\"".concat(card, "\">\n                    <img src=\"").concat(response2.data[0].images['small'], "\" alt=\"").concat(card.name, "\">\n                    </div>\n                    "));
                });
            }
        }
        else {
            alert('Vous n\'avez pas de pack, veuillez en acheter');
            window.location.href = '/shop';
        }
    });
}
