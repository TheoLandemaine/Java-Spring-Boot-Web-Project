document.addEventListener('click', (e) => {
// @ts-ignore
    if (e.target.classList.contains('logotype')) {
        // @ts-ignore
        window.location.href = '/';
    }
})

document.addEventListener('mouseover', (e) => {
    // @ts-ignore
    console.log(e.target.classList)
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
    $('.navColumn').append(`
        <li> <a href="/">Profile </a> </li>
        <li> <a href="/">Logout </a> </li>
       `);
} else {
    // @ts-ignore
    console.log('user is not logged in , is token : ', checkCookie());
}