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

generatePacksFromAPI(token);

function generatePacksFromAPI(token) {
        // Create Fetch API request
        // @ts-ignore
        const url:string = 'https://api.pokemontcg.io/v2/cards?q=';
        // Create XMLHttpRequest request GET
        var xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        // Clear div
                        let div: HTMLDivElement = document.querySelector(`.myCardsContainers`)[0] as HTMLDivElement;
                        div.innerHTML = '';

                        for (var i: number = 0; i < JSON.parse(xhr.responseText).length; i++) {
                                var pack: any = JSON.parse(xhr.responseText)[i];
                                div.innerHTML += `
                    <div class = "myCardCards" data-attr="${pack.p_type}">
                        <div class = "packFace">
                            <img  class="openPack" src="${packVisual(pack.p_type)}">
                        </div> 
                    </div>
                `;
                        }
                }
        };

        xhr.open('GET', url, true);
        xhr.send();

}