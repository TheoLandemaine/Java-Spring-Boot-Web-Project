document.addEventListener('click', (e) => {
    const target: any = e.target as HTMLElement;
    if (target.classList.contains('logotype')) {
        window.location.href = '/';
    }
})

document.addEventListener('mouseover', (e) => {
    const target: any = e.target as HTMLElement;
    if (target.classList.contains('logotype')) {
        target.style.cursor = 'pointer';
    }
});
// @ts-ignore
$.post('api/getGiftAccess', {'token': checkCookie()}, (data) => {
    if (data) {
// @ts-ignore
        $.post('/api/randomGift', {'token': checkCookie()}, (data) => {
            {
                $('.navColumn').append(`<li><a class="nav applyGift"><span class="giftValue">${data}</span> <i class="fas fa-hand-holding-usd"></i></a></li>`);
            }
        });
    }
});

// @ts-ignore

$.post('/api/getUserCoins', {'token': checkCookie()}, (data) => {
    $('.navColumn').append(`<li><a class="nav" href="./shop"><span id="actualCoins">${data}</span> <i class="fas fa-coins"></i></a></li>`);
});


// @ts-ignore
if (checkCookie() !== 'false') {
    $('.navColumn').empty();
    $('.firstNav').empty();

    $('.navColumn').append(`<li><a class="nav" href="/profile">Profile</a></li>`);

    $('.firstNav').append(`
        <li><a class="nav" href="./">Home</a></li>
<!--        <li><a href="./users">Users</a></li>-->
        <li><a class="nav" href="./search">Catalog</a></li>
        <li><a class="nav" href="./shop">Shop</a></li>
    `);
}

// @ts-ignore
$.post('/api/getCards', {'token': checkCookie()}, (data) => {
    if(data.length > 0) {
        // $('.firstNav').append(`<li><a href="./myCards">My Cards</a></li>`);
    }
});

// @ts-ignore
$.post('/api/getPacks', {'token': checkCookie()}, (data) => {
    if(data.length > 0) {
        $('.firstNav').append(`<li><a class="nav" href="./myPacks">My Packs</a></li>`);
    }
});

$(document).click((e)=> {
    const target: any = e.target as unknown as HTMLElement;
    if (target.classList.contains('applyGift') || target.parentNode.classList.contains('applyGift')) {
        // Get the value of .giftValue
        const giftValue = $('.giftValue').text();
    $('.navColumn').empty();
        // @ts-ignore
        $.post('api/giveGift', {'token': checkCookie(), 'gift': parseInt(giftValue)}, (response) => {
            if (response !== false) {
            } else {
                alert('You have no coins to clear');
            }

            $('.navColumn').append(`<li><a class="nav" href="./profile">Profile</a></li>`);

            // @ts-ignore

                $.post('/api/getUserCoins', {'token': checkCookie()}, (data) => {
                    $('.navColumn').append(`<li><a class="nav" href="./shop"><span id="actualCoins">${data}</span> <i class="fas fa-coins"></i></a></li>`);
                });

        });
    }
})


$(document).mouseover((e) => {
    const target: any = e.target as unknown as HTMLElement;
    if (target.classList.contains('applyGift')) {
        target.style.cursor = 'pointer';
    }
});


