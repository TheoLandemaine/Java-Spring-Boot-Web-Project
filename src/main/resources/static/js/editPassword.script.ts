const url5: string = '/api/getUserInformations';

// @ts-ignore
$.post(url5, {'token': checkCookie()}, function (data) {
    // Change document.querySelector("#username") input value to data[0].username
    const username: HTMLInputElement = document.querySelector("#username");
    username.value = data[0].username;
});

// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
console.log('submit');

    const username: string = (<HTMLInputElement>document.querySelector('#username')).value; // Get the email value
    const actualPassword: string = (<HTMLInputElement>document.querySelector('#exPassword')).value; // Get the password value
    const newPassword: string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value
    const newPasswordConfirmation: string = (<HTMLInputElement>document.querySelector('#confirmPassword')).value; // Get the confirm password value

    const data = {
        // @ts-ignore
        token: checkCookie(),
        'actualPassword': actualPassword,
        'newPassword': newPassword,
        'newPasswordConfirmation': newPasswordConfirmation
    };

    console.log(data);
    if (newPassword && username && actualPassword && newPasswordConfirmation && newPassword === newPasswordConfirmation) {
        // Register the account into the api
        const url: string = './api/editPassword';
console.log(data);
        $.post(url, data, function (data) {
            // If response is true, redirect to login page
            if (data !== false) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = './login';
            } else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">'+
                    '<p class="popupMessage">Your previous password do not correspond to your account</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            }
        });
    } else if (!newPassword || !newPassword || !newPasswordConfirmation) {
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
