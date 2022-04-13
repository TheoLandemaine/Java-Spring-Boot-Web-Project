$('#edit').on('click', function () {
    window.location.href = '/edit';
});

$('#modifyPassword').on('click', function () {
    window.location.href = '/modifyPassword';
});

$('#delete').on('click', function () {
    window.location.href = '/delete';
});

$('#myPacks').on('click', function () {
    window.location.href = '/myPacks';
});

$('#logout').on('click', function () {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
});

const myCards = document.querySelector('#myCards');
myCards.addEventListener("click", function (e) {
    window.location.href = '/myCards';
});
