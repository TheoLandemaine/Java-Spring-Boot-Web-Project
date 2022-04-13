$(document).ready(() => {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});

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
                    <img src="${response2.data[0].images['large']}" alt="${card.name}">
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