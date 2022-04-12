// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
    var email = document.querySelector('#email').value; // Get the email value
    var password = document.querySelector('#password').value; // Get the password value
    var data = {
        email: email,
        password: password
    };
    if (password && email) {
        // Register the account into the api
        var url_1 = '/api/login';
        $.post(url_1, data, function (data) {
            // If response is true, redirect to login page
            if (data !== "false") {
                document.cookie = 'token=' + data;
                window.location.href = '/';
            }
            else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">' +
                        '<p class="popupMessage">This account does not exist</p>' +
                        '<button class="popupButton">OK</button>' +
                        '</div>';
            }
        });
    }
    else if (!password || !email) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
                '<p class="popupMessage">Please fill in all the fields</p>' +
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
    // After 1.5 seconds the popup will disappear
    setTimeout(function () {
        document.querySelector('.popup').remove();
    }, 3500);
});
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('popupButton')) {
        target.parentNode.remove();
    }
});
