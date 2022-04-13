var email = false;
var username = false;
var password = false;
var password_confirm = false;
var exPassword = false;
document.addEventListener('change', function (e) {
    var target = e.target;
    if (target.getAttribute('id') === "username") {
        // If it corresponds to the format make it valid
        if (target.value.match(/^[a-z A-Z]+$/) && target.value.length <= 50) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';
            username = true;
            // If it doesn't correspond to the format make it invalid
        }
        else if (target.value != "" && !target.value.match(/^[a-zA-Z]+$/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            username = false;
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Invalid Username</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            username = false;
        }
    }
    else if (target.getAttribute('id') === "email") {
        // If it corresponds to the format mail@mailbox.com make it valid with accents and no special characters
        if (target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';
            email = true;
            // If it doesn't correspond to the format make it invalid
        }
        else if (target.value.length > 0 && !target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            email = false;
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Email is incorrect</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            email = false;
        }
    }
    else if (target.getAttribute('id') === "password" || target.getAttribute('id') === "confirmPassword" || (target.getAttribute('id') === "exPassword" && document.querySelector('exPassword'))) {
        // If it corresponds to the format make it valid
        if (target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';
            if (target.getAttribute('id') === 'password') {
                password = true;
            }
            else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = true;
            }
            else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = true;
            }
            // If it has not 8 characters make it invalid
        }
        else if (target.value.length < 8 && target.value.length > 0) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            if (target.getAttribute('id') === 'password') {
                password = false;
            }
            else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
            }
            else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = false;
            }
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Your password must be at least 8 characters longer</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // After 1.5 seconds the popup will disappear
            setTimeout(function () {
                document.querySelector('.popup').remove();
            }, 1500);
            // If it doesn't correspond to the format make it invalid
        }
        else if (target.value != "" && !target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            var popup = document.createElement('div');
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Your password must contain at least one uppercase letter, one lowercase letter and one special character </p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            if (target.getAttribute('id') === 'password') {
                password = false;
            }
            else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
            }
            else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = false;
            }
        }
    }
    var popups = document.querySelectorAll('.popup');
    if (popups.length > 0) {
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
    }
    if ((username || !document.querySelector('#username')) && (email || !document.querySelector('#email')) && (password || !document.querySelector('#password')) && (password_confirm || !document.querySelector('#confirmPassword')) && (exPassword || !document.querySelector('#exPassword'))) {
        document.querySelector('#submit').removeAttribute('disabled');
    }
    else {
        document.querySelector('#submit').setAttribute('disabled', 'disabled');
    }
});
