$('#logout').on('click', () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';

})

const edit = document.querySelector('#edit');
const modifyPassword = document.querySelector('#modifyPassword');
const supp = document.querySelector('#delete');
const logout = document.querySelector('#logout');
const myPacks = document.querySelector('#myPacks');
const myCards = document.querySelector('#myCards');

edit.addEventListener("click", function (e) {
        window.location.href = '/edit';
})

modifyPassword.addEventListener("click", function (e) {
        window.location.href = '/password';
})

/*
supp.addEventListener("click", function (e) {
        window.location.href = '/delete';
})
*/

logout.addEventListener("click", function (e) {
        window.location.href = '/';
})

myPacks.addEventListener("click", function (e) {
        window.location.href = '/myPacks';
})

myCards.addEventListener("click", function (e) {
        window.location.href = '/myCards';
})