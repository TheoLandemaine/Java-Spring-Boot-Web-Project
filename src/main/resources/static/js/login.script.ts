// On submit click
document.querySelector('#submit').addEventListener('click', function(e) {
    e.preventDefault();

    console.log("tesst");

    const email:string = (<HTMLInputElement>document.querySelector('#email')).value; // Get the email value
    const password:string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    const xhr:XMLHttpRequest = new XMLHttpRequest();
    if ( password && email ) {
        console.log(password + " " + email);
        // Register the account into the api
        const url: string = 'http://localhost:8080/api/login';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If response is true, redirect to login page
                if (xhr.responseText !== 'false') {
                    document.cookie = 'token=' + xhr.responseText;

                    window.location.href = '/';
                } else {
                    // If response is false, show error message
                    document.querySelector('#popUpContainer').innerHTML +=
                        '<div class="popup">' +
                        '<p class="popupMessage">This account does not exist</p>' +
                        '<button class="popupButton">OK</button>' +
                        '</div>';

                    let popups = document.querySelectorAll('.popup');
                    for (let y = 0;  y < popups.length; y++) {
                        if (popups[y].classList.contains('coming')) {
                            popups[y].classList.remove('coming');
                        }
                    }
                    for (let i = popups.length-1; i < popups.length; i++) {
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
                    } , 1000);

                    setTimeout(function () {
                        document.querySelector('.popup').remove();
                    } , 1500);


                }
            }
        };
        xhr.send(data);
    } else if ( !password || !email ) {
        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
            '<p class="popupMessage">Please fill in all the fields</p>' +
            '<button class="popupButton">OK</button>' +
            '</div>';

        let popups = document.querySelectorAll('.popup');
        for (let y = 0;  y < popups.length; y++) {
            if (popups[y].classList.contains('coming')) {
                popups[y].classList.remove('coming');
            }
        }
        for (let i = popups.length-1; i < popups.length; i++) {
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
        } , 1000);

        // After 1.5 seconds the popup will disappear
        setTimeout(function () {
            document.querySelector('.popup').remove();
        } , 1500);


    }

});

document.addEventListener('click', (e) => {
    //@ts-ignore
    if (e.target.classList.contains('popupButton')) {
        //@ts-ignore
        e.target.parentNode.remove();
    }
});
