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
