document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('logotype')) {
        window.location.href = '/';
    }
});
document.addEventListener('mouseover', function (e) {
    var target = e.target;
    if (target.classList.contains('logotype')) {
        target.style.cursor = 'pointer';
    }
});
// @ts-ignore
$.post('api/getGiftAccess', { 'token': checkCookie() }, function (data) {
    console.log(data);
    if (data) {
        // @ts-ignore
        $.post('/api/randomGift', { 'token': checkCookie() }, function (data) {
            {
                $('.navColumn').append("<li><a class=\"nav applyGift\"><span class=\"giftValue\">".concat(data, "</span> <i class=\"fas fa-hand-holding-usd\"></i></a></li>"));
            }
        });
    }
});
// @ts-ignore
$.post('/api/getUserCoins', { 'token': checkCookie() }, function (data) {
    $('.navColumn').append("<li><a class=\"nav\" href=\"./shop\">".concat(data, " <i class=\"fas fa-coins\"></i></a></li>"));
});
// @ts-ignore
if (checkCookie() !== 'false') {
    $('.navColumn').empty();
    $('.firstNav').empty();
    $('.navColumn').append("<li><a class=\"nav\" href=\"/profile\">Profile</a></li>");
    $('.firstNav').append("\n        <li><a class=\"nav\" href=\"./\">Home</a></li>\n<!--        <li><a href=\"./users\">Users</a></li>-->\n        <li><a class=\"nav\" href=\"./search\">Catalog</a></li>\n        <li><a class=\"nav\" href=\"./shop\">Shop</a></li>\n    ");
}
// @ts-ignore
$.post('/api/getCards', { 'token': checkCookie() }, function (data) {
    if (data.length > 0) {
        // $('.firstNav').append(`<li><a href="./myCards">My Cards</a></li>`);
    }
});
// @ts-ignore
$.post('/api/getPacks', { 'token': checkCookie() }, function (data) {
    if (data.length > 0) {
        $('.firstNav').append("<li><a class=\"nav\" href=\"./myPacks\">My Packs</a></li>");
    }
});
$(document).click(function (e) {
    var target = e.target;
    if (target.classList.contains('applyGift') || target.parentNode.classList.contains('applyGift')) {
        // Get the value of .giftValue
        var giftValue = $('.giftValue').text();
        console.log(giftValue);
        $('.navColumn').empty();
        // @ts-ignore
        $.post('api/giveGift', { 'token': checkCookie(), 'gift': parseInt(giftValue) }, function (response) {
            if (response !== false) {
            }
            else {
                alert('You have no coins to clear');
            }
            $('.navColumn').append("<li><a class=\"nav\" href=\"./profile\">Profile</a></li>");
            // @ts-ignore
            $.post('/api/getUserCoins', { 'token': checkCookie() }, function (data) {
                $('.navColumn').append("<li><a class=\"nav\" href=\"./shop\">".concat(data, " <i class=\"fas fa-coins\"></i></a></li>"));
            });
        });
    }
});
$(document).mouseover(function (e) {
    var target = e.target;
    if (target.classList.contains('applyGift')) {
        target.style.cursor = 'pointer';
    }
});
