// On submit click
document.querySelector('#submit').addEventListener('click', function(e) {
    e.preventDefault();

    const username:string = (<HTMLInputElement>document.querySelector('#username')).value; // Get the username value
    const password:string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value
    const confirmPassword:string = (<HTMLInputElement>document.querySelector('#confirmPassword')).value; // Get the confirm password value
    const email:string = (<HTMLInputElement>document.querySelector('#email')).value; // Get the email value

    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    const xhr:XMLHttpRequest = new XMLHttpRequest();
    if (username && password && email && confirmPassword && (password === confirmPassword)) {
        // Register the account into the api
        const url: string = 'http://localhost:8080/api/register';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If response is true, redirect to login page
                if (xhr.responseText !== 'false') {
                    // Create cookie and stock result in him
                    document.cookie = 'token=' + xhr.responseText;

                    window.location.href = './login';
                } else {
                    // If response is false, show error message
                    alert('Username already exists');
                }
            }
        };
        xhr.send(data);
    } else if ( !username || !password || !email || !confirmPassword ) {
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
    }, 1000);

    // After 1.5 seconds the popup will disappear
    setTimeout(function () {
        document.querySelector('.popup').remove();
    }, 1500);

    // @ts-ignore
    if (checkValues()) {
        document.querySelector('#submit').removeAttribute('disabled');
    } else {
        document.querySelector('#submit').setAttribute('disabled', 'disabled');
    }

});

document.addEventListener('click', (e) => {
    //@ts-ignore
    if (e.target.classList.contains('popupButton')) {
        //@ts-ignore
        e.target.parentNode.remove();
    }
});
