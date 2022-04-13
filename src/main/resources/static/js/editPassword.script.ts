const url5: string = 'http://localhost:8080/api/getUserInformations';

// @ts-ignore
$.post(url5, {'token': checkCookie()}, function (data) {
    // Change document.querySelector("#username") input value to data[0].username
    const username: HTMLInputElement = document.querySelector("#username");
    username.value = data[0].username;
});

// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();


    const username: string = (<HTMLInputElement>document.querySelector('#username')).value; // Get the email value
    const exPassword: string = (<HTMLInputElement>document.querySelector('#exPassword')).value; // Get the password value
    const password: string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value
    const confirmPassword: string = (<HTMLInputElement>document.querySelector('#confirmPassword')).value; // Get the confirm password value

    const data = {
        'username': username,
        'exPassword': exPassword,
        'password': password,
        'editPassword': confirmPassword
    };


    if (password && username && exPassword && confirmPassword && password === confirmPassword) {
        // Register the account into the api
        const url: string = './api/editPassword';

        $.post(url, data, function (data) {
            // If response is true, redirect to login page
            if (data === 'true') {
                window.location.href = './profile';
            } else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">'
                '<p class="popupMessage">Your previous password do not correspond to your account</p>' +
                '<button class="popupButton">OK</button>' +
                '</div>';
            }
        });
    } else if (!password || !password || !confirmPassword) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
            '<p class="popupMessage">Please fill in all the fields</p>' +
            '<button class="popupButton">OK</button>' +
            '</div>';
    } else {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
            '<p class="popupMessage">Passwords do not match</p>' +
            '<button class="popupButton">OK</button>' +
            '</div>';
    }

    let popups = document.querySelectorAll('.popup');
    for (let y = 0; y < popups.length; y++) {
        if (popups[y].classList.contains('coming')) {
            popups[y].classList.remove('coming');
        }
    }
    for (let i = popups.length - 1; i < popups.length; i++) {
        popups[i].classList.add('coming');
    }


    setTimeout(function () {
        let popups = document.querySelectorAll('.popup')
        for (let i = 0; i < popups.length; i++) {
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

document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('popupButton')) {
        //@ts-ignore
        target.parentNode.remove();
    }
});
