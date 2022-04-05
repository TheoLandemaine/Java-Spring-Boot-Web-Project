// Create Fetch API request
var url = 'http://localhost:8080/api/users';
fetch(url)
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    console.log(data);
    // Create a new table row for each user
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        $("table").append("\n                    <tr>\n                        <td>".concat(user.firstName, "</td>\n                        <td>").concat(user.lastName, "</td>\n                    </tr>\n                "));
    }
    $("script").remove();
});
