// Create Fetch API request
const url: string = 'http://localhost:8080/api/users';

setInterval(() => {if (!document.hidden) {realTime();}}, 1000);

function realTime() {
    // Create XMLHttpRequest request GET
    var xhr: XMLHttpRequest = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Clear table
            var table: HTMLTableElement = document.querySelector(`table`) as HTMLTableElement;
            table.innerHTML = '';

            for (var i: number = 0; i < JSON.parse(xhr.responseText).length; i++) {
                var user: any = JSON.parse(xhr.responseText)[i];
                table.innerHTML += `
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                    </tr>
                `;
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}