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
    // @ts-ignore
    $('.navColumn').append("\n        <li> <a href=\"/\">Profile </a> </li>\n        <li> <a onClick=\"document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; window.location.href = 'google.com'\">Logout </a> </li>\n       ");
}
else {
    // @ts-ignore
    console.log('user is not logged in , is token : ', checkCookie());
}
