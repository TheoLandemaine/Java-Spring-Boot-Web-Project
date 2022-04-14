// Create Fetch API request
const url: string = '/api/users';

function realTime() {
    $.get(url, function (data) {
        // Clear table
        var table: HTMLTableElement = document.querySelector(`table`) as HTMLTableElement;
        table.innerHTML = '';

        for (var i: number = 0; i < data.length; i++) {
            var user: any = data[i];
            table.innerHTML += `
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                    </tr>
                `;
        }
    }).fail(function () {
        console.log(`Failed to load users from ${url}.`);
    });
}