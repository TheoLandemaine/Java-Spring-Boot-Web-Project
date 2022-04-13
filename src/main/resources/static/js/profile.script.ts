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

$(document).ready(() => {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});

//When we click on the page
$(document).on('click', (e) => {

    //Start the function
    // @ts-ignore
    const target: any = e.target as HTMLElement;
    if (target.classList.contains('btn_sell')) {


        let cardType = target.parentNode.parentNode.getAttribute('data-type');
        let cardId = target.parentNode.parentNode.getAttribute('data-id');
        // console.log(cardType);
        // console.log(cardId);

        $('#popupConfirmSell').addClass('confirmSellContainer');
        $('#popupConfirmSell').append(`
            <div class="confirmSell">
                <h2>Are you sure you want to sell this card?</h2>
                <button type="button" class="yes">Yes</button>
                <button type="button" class="no">No</button>
            </div>
        `);
        $('.yes').on('click', function () {
            sellCards(cardId, cardType);
        });
        $('.no').on('click', function () {
            $('#popupConfirmSell').removeClass('confirmSellContainer');
            $('#popupConfirmSell').empty();
        });
    }
})


function sellCards(cardId, cardType) {
    //@ts-ignore
    let token = checkCookie();
    let url:string = 'api/deleteCard';
    let data = {
        token: token,
        cardId: cardId,
        cardType: cardType
   };

    $.post(url, data, function(response) {
        console.log(response);
        if (response !== false) {
            //@ts-ignore
            // Refresh the page
            window.location.href = '/profile';
        } else {
            alert('Error while deleting the card');
        }
    });
}

function generateCardsFromAPI(token) {
    // Create Fetch API request
// @ts-ignore
    const url: string = '/api/getCards';
    // Create XMLHttpRequest request GET
    const data: Object = {
        // @ts-ignore
        token: token
    };


    $.post(url, data, (response) => {


        if (response !== false) {

            for (let i: number = 0; i < response.length; i++) {
                let cardId: any = response[i];
                let urlAPI = 'https://api.pokemontcg.io/v2/cards/?q=id:' + cardId;
                $.get(urlAPI, (response2) => {
                    let card:any = response2;

                    $('.allCards').append(`
                    <div class = "card" data-type="${card.data[0].rarity}" data-id="${cardId}">
                        <div class="cardsBtn">
                            <img src="${card.data[0].images['small']}" alt="${card.name}">
                            <button class="btn_sell">Sell card</button>
                        </div>
                    </div>
                    `);
                });
            }

        } else {
            alert('Vous n\'avez pas de pack, veuillez en acheter');
            window.location.href = '/shop';
        }
    });
}