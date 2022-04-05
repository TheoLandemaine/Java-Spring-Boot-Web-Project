// Create Fetch API request
const url: string = 'http://localhost:8080/api/users';

// Create XMLHttpRequest request GET
var xhr: XMLHttpRequest = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        for (var i: number = 0; i < JSON.parse(xhr.responseText).length; i++) {
            var user: any = JSON.parse(xhr.responseText)[i];
            document.querySelector(`table`).innerHTML += `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                    </tr>
                `;
        }
    }
};

xhr.open('GET', url, true);
xhr.send();