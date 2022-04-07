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
// console.log('token',checkCookie());
if (checkCookie()) {
    // @ts-ignore
    console.log('user is logged in , is token : ', checkCookie());
    // @ts-ignore
    $('.navColumn').empty();
    console.log($('.navColumn'));
    // @ts-ignore
    $('.navColumn').append("\n        <li> <a href=\"/profile\">Profile </a> </li>\n        <li> <a href=\"/api/logout\">Logout </a> </li>\n       ");
    // When user log out, delete token from the cookie
    // @ts-ignore
    $('.navColumn').on('click', function (e) {
        // @ts-ignore
        if (e.target.innerText === 'Logout') {
            // @ts-ignore
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // @ts-ignore
            window.location.href = '/';
        }
    });
}
else {
    // @ts-ignore
    console.log('user is not logged in , is token : ', checkCookie());
}
