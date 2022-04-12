// @ts-ignore
$('#logout').on('click', () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';

})

let edit = document.querySelector('#edit');
let modifyPassword = document.querySelector('#modifyPassword');
let supp = document.querySelector('#delete');
let myPacks = document.querySelector('#myPacks');
let logout = document.querySelector('#logout');

edit.addEventListener("click", function (e) {
        window.location.href = '/edit';
        console.log("test");
})

modifyPassword.addEventListener("click", function (e) {
        window.location.href = '/password';
})

supp.addEventListener("click", function (e) {
        window.location.href = '/delete';
})

myPacks.addEventListener("click", function (e) {
        window.location.href = '/myPacks';
})

logout.addEventListener("click", function (e) {
        window.location.href = '/';
})
