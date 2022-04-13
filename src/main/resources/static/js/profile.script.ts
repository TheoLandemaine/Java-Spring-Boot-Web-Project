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
$(document).on('click', '.btn_sell', function() {

    //Start the function
    sellCards();
})


function sellCards() {
    console.log("test delete card");
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
                    <div class = "card" data-attr="${card}">
                        <div class="cardsBtn">
                            <img src="${response2.data[0].images['small']}" alt="${card.name}">
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