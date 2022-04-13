$('#edit').on('click', () => {
    window.location.href = '/edit';
})

$('#modifyPassword').on('click', () => {
        window.location.href = '/modifyPassword';
})

$('#delete').on('click', () => {
        window.location.href = '/delete';
})

$('#myPacks').on('click', () => {
        window.location.href = '/myPacks';
})

$('#logout').on('click', () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
})

$.get('https://api.pokemontcg.io/v2/cards?q=id:swsh45sv-SV107', (data)=> {
    const card = data.data[0];
    console.log(data);
    console.log(data.data)
    console.log(data.data[0].id);
    console.log(data.data[0].images);
    console.log(data.data[0].images.small);

    $('#myCards').append(`<div> ${card.id} ${card.name}</div>`);
    $('#myCards').append(`<img src="${card.images.small}" class="resultsImage" alt="your pokemon card">`);

});