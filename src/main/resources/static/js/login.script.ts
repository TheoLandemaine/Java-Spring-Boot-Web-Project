// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();

    const email: string = (<HTMLInputElement>document.querySelector('#email')).value; // Get the email value
    const password: string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value

    const data: Object = {
        email: email,
        password: password
    };

    if (password && email) {
        // Register the account into the api
        const url: string = '/api/login';

        $.post(url, data, function (data) {
            // If response is true, redirect to login page
            if (data !== "false") {
                document.cookie = 'token=' + data;

                window.location.href = '/';
            } else {
                // If response is false, show error message
                document.querySelector('#popUpContainer').innerHTML +=
                    '<div class="popup">' +
                    '<p class="popupMessage">This account does not exist</p>' +
                    '<button class="popupButton">OK</button>' +
                    '</div>';
            }
        });
    } else if (!password || !email) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
            '<p class="popupMessage">Please fill in all the fields</p>' +
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

    // After 1.5 seconds the popup will disappear
    setTimeout(function () {
        document.querySelector('.popup').remove();
    }, 3500);

});

document.addEventListener('click', (e) => {
    const target: any = e.target as HTMLElement;
    if (target.classList.contains('popupButton')) {
        target.parentNode.remove();
    }
});
