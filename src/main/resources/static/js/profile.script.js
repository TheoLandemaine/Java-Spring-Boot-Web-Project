// @ts-ignore
$('#logout').on('click', function () {
    // @ts-ignore
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // @ts-ignore
    window.location.href = '/';
});
var edit = document.querySelector('#edit');
var modifyPassword = document.querySelector('#modifyPassword');
var supp = document.querySelector('#delete');
var logout = document.querySelector('#logout');
edit.addEventListener("click", function (e) {
    window.location.href = '/edit';
});
modifyPassword.addEventListener("click", function (e) {
    window.location.href = '/password';
});
supp.addEventListener("click", function (e) {
    window.location.href = '/delete';
});
logout.addEventListener("click", function (e) {
    window.location.href = '/';
});
