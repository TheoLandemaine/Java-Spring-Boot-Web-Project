// Create Fetch API request
var url = '/api/users';
function realTime() {
    $.get(url, function (data) {
        // Clear table
        var table = document.querySelector("table");
        table.innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            var user = data[i];
            table.innerHTML += "\n                    <tr>\n                        <td>".concat(user.userId, "</td>\n                        <td>").concat(user.username, "</td>\n                        <td>").concat(user.email, "</td>\n                    </tr>\n                ");
        }
    }).fail(function () {
        console.log("Failed to load users from ".concat(url, "."));
    });
}
