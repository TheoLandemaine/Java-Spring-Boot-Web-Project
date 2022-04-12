// @ts-ignore
$('#logout').on('click', function () {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
});
var edit = document.querySelector('#edit');
var modifyPassword = document.querySelector('#modifyPassword');
var supp = document.querySelector('#delete');
var myPacks = document.querySelector('#myPacks');
var logout = document.querySelector('#logout');
edit.addEventListener("click", function (e) {
    window.location.href = '/edit';
    console.log("test");
});
modifyPassword.addEventListener("click", function (e) {
    window.location.href = '/password';
});
supp.addEventListener("click", function (e) {
    window.location.href = '/delete';
});
myPacks.addEventListener("click", function (e) {
    window.location.href = '/myPacks';
});
logout.addEventListener("click", function (e) {
    window.location.href = '/';
});
