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
var myCards = document.querySelector('#myCards');
myCards.addEventListener("click", function (e) {
    window.location.href = '/myCards';
});
$(document).ready(function () {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});
//When we click on the page
$(document).click(function (e) {
    //If contains the class "btn_sell"
    if (e.target.classList.contains('btn_sell')) {
        //Start the function
        sellCards();
    }
});
function sellCards() {
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
            for (var i = 0; i < response.length; i++) {
                var cardId = response[i];
                var urlAPI = 'https://api.pokemontcg.io/v2/cards/?q=id:' + cardId;
                $.get(urlAPI, function (response2) {
                    var card = response2;
                    $('.allCards').append("\n                    <div class = \"card\" data-attr=\"".concat(card, "\">\n                        <div class=\"cardsBtn\">\n                            <img src=\"").concat(response2.data[0].images['small'], "\" alt=\"").concat(card.name, "\">\n                            <button class=\"btn_sell\">Sell card</button>\n                        </div>\n                    </div>\n                    "));
                });
            }
        }
        else {
            alert('Vous n\'avez pas de pack, veuillez en acheter');
            window.location.href = '/shop';
        }
    });
}
