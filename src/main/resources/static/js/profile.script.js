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
$.get('https://api.pokemontcg.io/v2/cards?q=id:swsh45sv-SV107', function (data) {
    var card = data.data[0];
    console.log(data);
    console.log(data.data);
    console.log(data.data[0].id);
    console.log(data.data[0].images);
    console.log(data.data[0].images.small);
    $('#myCards').append("<div> ".concat(card.id, " ").concat(card.name, "</div>"));
    $('#myCards').append("<img src=\"".concat(card.images.small, "\" class=\"resultsImage\" alt=\"your pokemon card\">"));
});
