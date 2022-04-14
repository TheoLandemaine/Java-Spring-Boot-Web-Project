$('#edit').on('click', function () {
    window.location.href = '/edit';
});

$('#modifyPassword').on('click', function () {
    window.location.href = '/modifyPassword';
});

$('#delete').on('click', function () {
    // @ts-ignore
    Swal.fire({
        title: `Are you sure to delete your account ?`,
        text: "You won't be able to revert this !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
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

$(document).ready(() => {
    //@ts-ignore
    generateCardsFromAPI(checkCookie());
});

function sellCard(cardType: string, cardId: string) {
    //@ts-ignore
    let token = checkCookie();
    let url: string = 'api/deleteCard';
    let data = {
        token: token,
        cardId: cardId,
        cardType: cardType
    };

    $.post(url, data, function (response) {
        if (response === true) {
            $(`#${cardId}`).remove();

            const actualCoins = parseInt($(`#actualCoins`).text());

            $(`#actualCoins`).text("Updating...");

            // @ts-ignore
            $.post('/api/getUserCoins', {'token': checkCookie()}, (data) => {
                $('#actualCoins').text(`${data}`);

                // @ts-ignore
                Swal.fire(
                    `Sold! +${parseInt(data) - actualCoins} coins`,
                    'Your card has been sold.',
                    'success'
                )
            });
        } else {
            // @ts-ignore
            Swal.fire(
                'Error!',
                'Something went wrong.',
                'error'
            )
        }
    });
}

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
        $.post ('/api/getCardPrice', {'cardType': cardType}, (response) => {


            // @ts-ignore
            Swal.fire({
                title: `Are you sure to sell this card\n${response} coins ?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, sell it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    sellCard(cardType, cardId);
                }
            })
        });
    }
})

function generateCardsFromAPI(token) {
    // Create Fetch API request
    const url: string = '/api/getCards';
    // Create XMLHttpRequest request GET
    const data: Object = {
        "token": token
    };

    $.post(url, data, (response) => {
        if (response !== false) {

            for (let i: number = 0; i < response.length; i++) {
                let cardId: any = response[i];
                let urlAPI = `https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/cards/en/${cardId.split('-')[0]}.json`;

                $.get(urlAPI, (response) => {
                    let card: any = JSON.parse(response);

                    // Check if the card (with id) is in the card Object
                    for (let i = 0; i < card.length; i++) {
                        if (card[i].id === cardId) {
                            const rarity = card[i].rarity;
                            const image = card[i].images['small'];

                            $('.allCards').append(`
                                <div class="card" id="${cardId}" data-type="${rarity.toLowerCase()}" data-id="${cardId}">
                                    <div class="cardsBtn">
                                        <img src="${image}" alt="${cardId}">
                                        <button class="btn_sell">Sell card</button>
                                    </div>
                                </div>
                            `);
                            break;
                        }
                    }
                });
            }

        } else {
            alert('Vous n\'avez pas de pack, veuillez en acheter');
            window.location.href = '/shop';
        }
    });
}

function deleteAccount() {
    let url = '/api/deleteAccount';
    let data = {
        // @ts-ignore
        'token': checkCookie()
    };

    $.post(url, data, (response) => {
        if (response !== false) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/register';
        } else {
            alert('Error while deleting your account');
        }
    });
}