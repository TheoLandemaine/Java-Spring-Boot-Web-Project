var email = false;
var username = false;
var password = false;
var password_confirm = false;
var exPassword = false;
document.addEventListener('change', function (e) {
    // @ts-ignore
    if (e.target.getAttribute('id') === "username") {
        // If it corresponds to the format make it valid
        // @ts-ignore
        if (e.target.value.match(/^[a-z A-Z]+$/) && e.target.value.length <= 50) {
            // @ts-ignore
            e.target.style.borderColor = 'green';
            // @ts-ignore
            e.target.style.backgroundColor = '#d4edda';
            username = true;
            // If it doesn't correspond to the format make it invalid
            // @ts-ignore
        }
        else if (!e.target.value == "" && !e.target.value.match(/^[a-zA-Z]+$/)) {
            // @ts-ignore
            e.target.style.borderColor = 'red';
            // @ts-ignore
            e.target.style.backgroundColor = '#f8d7da';
            username = false;
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Invalid Username</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            // @ts-ignore
            e.target.style.borderColor = '#ccc';
            // @ts-ignore
            e.target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            username = false;
        }
        // @ts-ignore
    }
    else if (e.target.getAttribute('id') === "email") {
        // If it corresponds to the format mail@mailbox.com make it valid with accents and no special characters
        // @ts-ignore
        if (e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            // @ts-ignore
            e.target.style.borderColor = 'green';
            // @ts-ignore
            e.target.style.backgroundColor = '#d4edda';
            email = true;
            // If it doesn't correspond to the format make it invalid
            // @ts-ignore
        }
        else if (e.target.value.length > 0 && !e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            // @ts-ignore
            e.target.style.borderColor = 'red';
            // @ts-ignore
            e.target.style.backgroundColor = '#f8d7da';
            email = false;
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Email is incorrect</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            // @ts-ignore
            e.target.style.borderColor = '#ccc';
            // @ts-ignore
            e.target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            email = false;
        }
        // @ts-ignore
    }
    else if (e.target.getAttribute('id') === "password" || e.target.getAttribute('id') === "confirmPassword" || (e.target.getAttribute('id') === "exPassword" && document.querySelector(exPassword))) {
        // If it corresponds to the format make it valid
        // @ts-ignore
        if (e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            // @ts-ignore
            e.target.style.borderColor = 'green';
            // @ts-ignore
            e.target.style.backgroundColor = '#d4edda';
            // @ts-ignore
            if (e.target.getAttribute('id') === 'password') {
                password = true;
                // @ts-ignore
            }
            else if (e.target.getAttribute('id') === 'confirmPassword') {
                password_confirm = true;
                // @ts-ignore
            }
            else if (document.querySelector('#exPassword') && e.target.getAttribute('id') === 'exPassword') {
                exPassword = true;
            }
            // If it has not 8 characters make it invalid
            // @ts-ignore
        }
        else if (e.target.value.length < 8 && e.target.value.length > 0) {
            // @ts-ignore
            e.target.style.borderColor = 'red';
            // @ts-ignore
            e.target.style.backgroundColor = '#f8d7da';
            // @ts-ignore
            if (e.target.getAttribute('id') === 'password') {
                password = false;
                // @ts-ignore
            }
            else if (e.target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
                // @ts-ignore
            }
            else if (document.querySelector('#exPassword') && e.target.getAttribute('id') === 'exPassword') {
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
            // @ts-ignore
        }
        else if (!e.target.value == "" && !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            // @ts-ignore
            e.target.style.borderColor = 'red';
            // @ts-ignore
            e.target.style.backgroundColor = '#f8d7da';
            var popup = document.createElement('div');
            document.querySelector('#popUpContainer').innerHTML +=
                '<div class="popup">' +
                    '<p class="popupMessage">Your password must contain at least one uppercase letter, one lowercase letter and one special character </p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            // If it is empty, make it neutral
        }
        else {
            // @ts-ignore
            e.target.style.borderColor = '#ccc';
            // @ts-ignore
            e.target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            // @ts-ignore
            if (e.target.getAttribute('id') === 'password') {
                password = false;
                // @ts-ignore
            }
            else if (e.target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
                // @ts-ignore
            }
            else if (document.querySelector('#exPassword') && e.target.getAttribute('id') === 'exPassword') {
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
    // console.log(username || !document.querySelector('#username'));
    // console.log(email || !document.querySelector('#email'));
    // console.log(password || !document.querySelector('#password'));
    // console.log(password_confirm || !document.querySelector('#confirmPassword'));
    // console.log(exPassword || !document.querySelector('#exPassword'));
    if ((username || !document.querySelector('#username')) && (email || !document.querySelector('#email')) && (password || !document.querySelector('#password')) && (password_confirm || !document.querySelector('#confirmPassword')) && (exPassword || !document.querySelector('#exPassword'))) {
        document.querySelector('#submit').removeAttribute('disabled');
    }
    else {
        document.querySelector('#submit').setAttribute('disabled', 'disabled');
    }
});
