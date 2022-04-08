const url5:string = 'http://localhost:8080/api/getUserInformations';

// Create XMLHttpRequest request POST
const data = new FormData();
// @ts-ignore
data.append("token", checkCookie());

var xhr: XMLHttpRequest = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

        console.log(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
        console.log(JSON.parse(xhr.responseText)[0].username);
        console.log(JSON.parse(xhr.responseText)[0].email);
        console.log(JSON.parse(xhr.responseText)[0].userId);

        // insert username
        //@ts-ignore
        document.querySelector("#username").value = JSON.parse(xhr.responseText)[0].username;
    }
};

xhr.open('POST', url5, true);
xhr.send(data);

//

// On submit click
document.querySelector('#submit').addEventListener('click', function(e) {
    e.preventDefault();



    const username:string = (<HTMLInputElement>document.querySelector('#username')).value; // Get the email value
    const exPassword:string = (<HTMLInputElement>document.querySelector('#exPassword')).value; // Get the password value
    const password:string = (<HTMLInputElement>document.querySelector('#password')).value; // Get the password value
    const confirmPassword:string = (<HTMLInputElement>document.querySelector('#confirmPassword')).value; // Get the confirm password value
    const data = new FormData();
    data.append("username", username);
    data.append("exPassword", exPassword);
    data.append("password", password);
    data.append("editPassword", confirmPassword);


    const xhr:XMLHttpRequest = new XMLHttpRequest();
    if ( password && username && exPassword && confirmPassword && password === confirmPassword) {
        console.log(password + " " + username);
        // Register the account into the api
        const url: string = './api/editPassword';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If response is true, redirect to login page
                if (xhr.responseText === 'true') {
                    window.location.href = './profile';
                } else {
                    // If response is false, show error message
                    document.querySelector('#popUpContainer').innerHTML +=
                        '<div class="popup">'
                        '<p class="popupMessage">Your previous password do not correspond to your account</p>' +
                        '<button class="popupButton">OK</button>' +
                        '</div>';
        }
            }
        };
        xhr.send(data);
    } else if ( !password || !password || !confirmPassword) {
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
        } , 3000);

        setTimeout(function () {
            document.querySelector('.popup').remove();
        } , 3500);



});

document.addEventListener('click', (e) => {
    //@ts-ignore
    if (e.target.classList.contains('popupButton')) {
        //@ts-ignore
        e.target.parentNode.remove();
    }
});
