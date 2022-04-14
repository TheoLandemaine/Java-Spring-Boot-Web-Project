let email = false;
let username = false;
let password = false;
let password_confirm = false;
let exPassword = false;
document.addEventListener('change', (e) => {
    const target: any = e.target as HTMLElement;
    if (target.getAttribute('id') === "username") {

        // If it corresponds to the format make it valid
        if (target.value.match(/^[a-z A-Z]+$/) && target.value.length <= 50) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';
            username = true;


            // If it doesn't correspond to the format make it invalid
        } else if (target.value != "" && !target.value.match(/^[a-zA-Z]+$/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            username = false;

                // @ts-ignore
                Swal.fire(
                    'Error!',
                    'Invalid Username',
                    'error'
                )


            // If it is empty, make it neutral
        } else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            username = false;
        }

    } else if (target.getAttribute('id') === "email") {

        // If it corresponds to the format mail@mailbox.com make it valid with accents and no special characters
        if (target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';
            email = true;


            // If it doesn't correspond to the format make it invalid
        } else if (target.value.length > 0 && !target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
            email = false;

                // @ts-ignore
                Swal.fire(
                    'Error!',
                    'Your email is incorrect',
                    'error'
                )

            // If it is empty, make it neutral
        } else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';
            email = false;
        }
    } else if (target.getAttribute('id') === "password" || target.getAttribute('id') === "confirmPassword" || (target.getAttribute('id') === "exPassword" && document.querySelector('#exPassword'))) {


        // If it corresponds to the format make it valid
        if (target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            target.style.borderColor = 'green';
            target.style.backgroundColor = '#d4edda';

            if (target.getAttribute('id') === 'password') {
                password = true;
            } else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = true;
            } else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = true;
            }

            // If it has not 8 characters make it invalid
        } else if (target.value.length < 8 && target.value.length > 0) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';

            if (target.getAttribute('id') === 'password') {
                password = false;
            } else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
            } else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = false;
            }
                // @ts-ignore
                Swal.fire(
                    'Error!',
                    'Your password must be at least 8 characters long',
                    'error'
                )


            // After 1.5 seconds the popup will disappear
            setTimeout(function () {
                document.querySelector('.popup').remove();
            }, 1500);

            // If it doesn't correspond to the format make it invalid
        } else if (target.value != "" && !target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            target.style.borderColor = 'red';
            target.style.backgroundColor = '#f8d7da';
                // @ts-ignore
                Swal.fire(
                    'Error!',
                    'Your password must at least contain one uppercase letter, one lowercase letter, one number and one special character',
                    'error'
                )


            // If it is empty, make it neutral
        } else {
            target.style.borderColor = '#ccc';
            target.style.backgroundColor = 'rgba(250, 247, 247, 0.406)';

            if (target.getAttribute('id') === 'password') {
                password = false;
            } else if (target.getAttribute('id') === 'confirmPassword') {
                password_confirm = false;
            } else if (document.querySelector('#exPassword') && target.getAttribute('id') === 'exPassword') {
                exPassword = false;
            }
        }
    }

    if ((username || !document.querySelector('#username'))&& (password || !document.querySelector('#password')) && (password_confirm || !document.querySelector('#confirmPassword')) && (exPassword || !document.querySelector('#exPassword'))) {
        document.querySelector('#submit').removeAttribute('disabled');
    } else {
        document.querySelector('#submit').setAttribute('disabled', 'disabled');
    }
});






