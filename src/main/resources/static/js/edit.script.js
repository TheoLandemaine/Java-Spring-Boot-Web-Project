// Replace the username with user's username
var url4 = '/api/getUserInformations';
// Create XMLHttpRequest request POST
var data = new FormData();
// @ts-ignore
data.append("token", checkCookie());
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        //@ts-ignore
        document.querySelector("#username").value = JSON.parse(xhr.responseText)[0].username;
    }
};
xhr.open('POST', url4, true);
xhr.send(data);
//
// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
    var newUsername = document.querySelector('#username').value; // Get the email value
    var password = document.querySelector('#password').value; // Get the password value
    var confirmPassword = document.querySelector('#confirmPassword').value; // Get the confirm password value
    var data = {
        //@ts-ignore
        token: checkCookie(),
        newUsername: newUsername
    };
    console.log(data);
    if (password && newUsername && confirmPassword && password === confirmPassword) {
        // Register the account into the api
        var url_1 = './api/editProfile';
        $.post(url_1, data, function (response) {
            if (response !== false) {
                window.location.href = './profile';
            }
            else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">' +
                        '<p class="popupMessage">Password do not correspond to your account</p>' +
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
    //@ts-ignore
    if (e.target.classList.contains('popupButton')) {
        //@ts-ignore
        e.target.parentNode.remove();
    }
});
