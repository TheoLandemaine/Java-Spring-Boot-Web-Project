// Register the account into the api
var url = 'http://localhost:8080/api/register';
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var users = JSON.parse(xhr.responseText);
        var user = {
            // @ts-ignore
            username: document.getElementById('username').value,
            // @ts-ignore
            email: document.getElementById('email').value,
            // @ts-ignore
            password: document.getElementById('password').value
        };
        users.push(user);
        var xhr_1 = new XMLHttpRequest();
        xhr_1.onreadystatechange = function () {
            if (xhr_1.readyState === 4 && xhr_1.status === 200) {
                console.log(xhr_1.responseText);
            }
        };
        // @ts-ignore
        if (document.querySelector('#password').value === document.querySelector('#confirm-password').value) {
            xhr_1.open('POST', url, true);
            xhr_1.setRequestHeader('Content-Type', 'application/json');
            xhr_1.send(JSON.stringify(user));
        }
        else {
            alert('Password does not match');
        }
    }
};
xhr.open('POST', url, true);
xhr.send();
