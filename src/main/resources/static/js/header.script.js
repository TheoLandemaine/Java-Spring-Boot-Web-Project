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
$.post('/api/getUserCoins', { 'token': checkCookie() }, function (data) {
    $('.navColumn').append("<li><a href=\"./shop\">".concat(data, " <i class=\"fas fa-coins\"></i></a></li>"));
});
// @ts-ignore
if (checkCookie() !== 'false') {
    $('.navColumn').empty();
    $('.firstNav').empty();
    $('.navColumn').append("<li><a href=\"/profile\">Profile</a></li>");
    $('.firstNav').append("\n        <li><a href=\"./\">Home</a></li>\n        <li><a href=\"./users\">Users</a></li>\n        <li><a href=\"./search\">Catalog</a></li>\n        <li><a href=\"./shop\">Shop</a></li>\n    ");
}
