document.addEventListener('click', function (e) {
    // @ts-ignore
    if (e.target.classList.contains('logotype')) {
        // @ts-ignore
        window.location.href = '/';
    }
});
document.addEventListener('mouseover', function (e) {
    // @ts-ignore
    console.log(e.target.classList);
    // @ts-ignore
    if (e.target.classList.contains('logotype')) {
        // @ts-ignore
        e.target.style.cursor = 'pointer';
    }
});
