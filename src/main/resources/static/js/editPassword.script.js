var url5 = 'http://localhost:8080/api/getUserInformations';
// @ts-ignore
$.post(url5, { 'token': checkCookie() }, function (data) {
    console.log(data[0].username);
    console.log(data[0].email);
    console.log(data[0].userId);
    // Change document.querySelector("#username") input value to data[0].username
    var username = document.querySelector("#username");
    username.value = data[0].username;
});
// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.querySelector('#username').value; // Get the email value
    var exPassword = document.querySelector('#exPassword').value; // Get the password value
    var password = document.querySelector('#password').value; // Get the password value
    var confirmPassword = document.querySelector('#confirmPassword').value; // Get the confirm password value
    var data = {
        'username': username,
        'exPassword': exPassword,
        'password': password,
        'editPassword': confirmPassword
    };
    if (password && username && exPassword && confirmPassword && password === confirmPassword) {
        // Register the account into the api
        var url_1 = './api/editPassword';
        $.post(url_1, data, function (data) {
            // If response is true, redirect to login page
            if (data === 'true') {
                window.location.href = './profile';
            }
            else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">';
                '<p class="popupMessage">Your previous password do not correspond to your account</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            }
        });
    }
    else if (!password || !password || !confirmPassword) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
                '<p class="popupMessage">Please fill in all the fields</p>' +
                '<button class="popupButton">OK</button>' +
                '</div>';
    }
    else {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
                '<p class="popupMessage">Passwords do not match</p>' +
                '<button class="popupButton">OK</button>' +
                '</div>';
    }
    var popups = document.querySelectorAll('.popup');
    for (var y = 0; y < popups.length; y++) {
        if (popups[y].classList.contains('coming')) {
            popups[y].classList.remove('coming');
        }
    }
    for (var i = popups.length - 1; i < popups.length; i++) {
        popups[i].classList.add('coming');
    }
    setTimeout(function () {
        var popups = document.querySelectorAll('.popup');
        for (var i = 0; i < popups.length; i++) {
            if (!popups[i].classList.contains('leaving')) {
                popups[i].classList.add('leaving');
                break;
            }
        }
    }, 3000);
    setTimeout(function () {
        document.querySelector('.popup').remove();
    }, 3500);
});
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('popupButton')) {
        //@ts-ignore
        target.parentNode.remove();
    }
});
