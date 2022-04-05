// Create Fetch API request
const url:string = 'http://localhost:8080/api/users';

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data:string) {
        console.log(data);

        // Create a new table row for each user
        for (var i:number = 0; i < data.length; i++) {
            var user:any = data[i];
            $(`table`).append(`
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                    </tr>
                `);
        }

        $(`script`).remove();
    });