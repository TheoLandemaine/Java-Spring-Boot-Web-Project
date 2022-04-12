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
generatePacksFromAPI(token);
function generatePacksFromAPI(token) {
    // Create Fetch API request
    // @ts-ignore
    var url = 'https://api.pokemontcg.io/v2/cards?q=';
    // Create XMLHttpRequest request GET
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Clear div
            var div = document.querySelector(".myCardsContainers")[0];
            div.innerHTML = '';
            for (var i = 0; i < JSON.parse(xhr.responseText).length; i++) {
                var pack = JSON.parse(xhr.responseText)[i];
                div.innerHTML += "\n                    <div class = \"myCardCards\" data-attr=\"".concat(pack.p_type, "\">\n                        <div class = \"packFace\">\n                            <img  class=\"openPack\" src=\"").concat(packVisual(pack.p_type), "\">\n                        </div> \n                    </div>\n                ");
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}
