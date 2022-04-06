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
                if (xhr.responseText === 'true') {
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

        // After 1.5 seconds the popup will disappear 
        setTimeout(function () {
            document.querySelector('.popup').remove();
        } , 1500);


    } else {

        document.querySelector('#popUpContainer').innerHTML +=
            '<div class="popup">' +
            '<p class="popupMessage">Passwords do not match</p>' +
            '<button class="popupButton">OK</button>' +
            '</div>';

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
