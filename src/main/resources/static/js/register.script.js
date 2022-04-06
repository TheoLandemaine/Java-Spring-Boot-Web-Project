// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.querySelector('#username').value; // Get the username value
    var password = document.querySelector('#password').value; // Get the password value
    var confirmPassword = document.querySelector('#confirmPassword').value; // Get the confirm password value
    var email = document.querySelector('#email').value; // Get the email value
    var data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    var xhr = new XMLHttpRequest();
    if (username && password && email && confirmPassword && (password === confirmPassword)) {
        // Register the account into the api
        var url_1 = 'http://localhost:8080/api/register';
        xhr.open('POST', url_1, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If response is true, redirect to login page
                if (xhr.responseText !== 'false') {
                    // Create cookie and stock result in him
                    document.cookie = 'token=' + xhr.responseText;
                    window.location.href = './login';
                }
                else {
                    // If response is false, show error message
                    alert('Username already exists');
                }
            }
        };
        xhr.send(data);
    }
    else if (!username || !password || !email || !confirmPassword) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
                '<p class="popupMessage">Please fill in all the fields</p>' +
                '<button class="popupButton">OK</button>' +
                '</div>';
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
        }, 1000);
        // After 1.5 seconds the popup will disappear 
        setTimeout(function () {
            document.querySelector('.popup').remove();
        }, 1500);
    }
    else {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
                '<p class="popupMessage">Passwords do not match</p>' +
                '<button class="popupButton">OK</button>' +
                '</div>';
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
        }, 1000);
        setTimeout(function () {
            document.querySelector('.popup').remove();
        }, 1500);
    }
});
document.addEventListener('click', function (e) {
    //@ts-ignore
    if (e.target.classList.contains('popupButton')) {
        //@ts-ignore
        e.target.parentNode.remove();
    }
});
