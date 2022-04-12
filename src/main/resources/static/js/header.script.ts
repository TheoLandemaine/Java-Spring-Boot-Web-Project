document.addEventListener('click', (e) => {
    const target:any = e.target as HTMLElement;
    if (target.classList.contains('logotype')) {
        window.location.href = '/';
    }
})

document.addEventListener('mouseover', (e) => {
    const target:any = e.target as HTMLElement;
    if (target.classList.contains('logotype')) {
        target.style.cursor = 'pointer';
    }
});

// @ts-ignore
$.post('/api/getUserCoins', {'token': checkCookie()}, (data) => {
    $('.navColumn').append(`<li><a href="./shop">${data} <i class="fas fa-coins"></i></a></li>`);
});

// @ts-ignore
    if (checkCookie() !== 'false') {
        $('.navColumn').empty();
        $('.firstNav').empty();

        $('.navColumn').append(`<li><a href="/profile">Profile</a></li>`);

        $('.firstNav').append(`
        <li><a href="./">Home</a></li>
        <li><a href="./users">Users</a></li>
        <li><a href="./search">Catalog</a></li>
        <li><a href="./shop">Shop</a></li>
    `);
    }