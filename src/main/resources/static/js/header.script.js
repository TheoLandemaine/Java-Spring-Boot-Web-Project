document.addEventListener('click', function (e) {
    // @ts-ignore
    if (e.target.classList.contains('logotype')) {
        // @ts-ignore
        window.location.href = '/';
    }
});
document.addEventListener('mouseover', function (e) {
    // @ts-ignore
    // console.log(e.target.classList)
    // @ts-ignore
    if (e.target.classList.contains('logotype')) {
        // @ts-ignore
        e.target.style.cursor = 'pointer';
    }
});
// @ts-ignore
checkCookie();
// @ts-ignore
console.log('token', checkCookie());
// @ts-ignore
if (checkCookie() !== 'false') {
    // @ts-ignore
    console.log('user is logged in , is token : ', checkCookie());
    // @ts-ignore
    $('.navColumn').empty();
    // @ts-ignore
    $('.firstNav').empty();
    // @ts-ignore
    console.log($('.navColumn'));
    // @ts-ignore
    $('.navColumn').append("\n        <li> <a href=\"/profile\">Profile </a> </li>\n<!--        <li> <a href=\"/\">Logout </a> </li>-->\n       ");
    // @ts-ignore
    $('.firstNav').append("\n        <li><a href=\"./\">Home</a></li>\n        <li><a href=\"./users\">Users</a></li>\n        <li><a href=\"./search\">Catalog</a></li>\n        <li><a href=\"./shop\">Shop</a></li>\n        ");
}
else {
    // @ts-ignore
    console.log('user is not logged in , is token : ', checkCookie());
}
