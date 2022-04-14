// On submit click
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.querySelector('#username').value; // Get the username value
    var password = document.querySelector('#password').value; // Get the password value
    var confirmPassword = document.querySelector('#confirmPassword').value; // Get the confirm password value
    var email = document.querySelector('#email').value; // Get the email value
    var data = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };
    if (username && password && email && confirmPassword && (password === confirmPassword)) {
        // Register the account into the api
        var url_1 = '/api/register';
        $.post(url_1, data, function (data) {
            // If response is true, redirect to login page
            if (data !== 'false') {
                // Create cookie and stock result in him
                document.cookie = 'token=' + data;
                window.location.href = './login';
            }
            else {
                // If response is false, show error message
                // @ts-ignore
                Swal.fire('Error!', 'Email already exists !', 'error');
            }
        }).fail(function () {
            // @ts-ignore
            Swal.fire('Error!', 'Servor error !', 'error');
        });
    }
    else if (!username || !password || !email || !confirmPassword) {
        // @ts-ignore
        Swal.fire('Error!', 'Please fill in all the fields', 'error');
    }
    else {
        // @ts-ignore
        Swal.fire('Error!', 'Passwords does not match!', 'error');
    }
});
