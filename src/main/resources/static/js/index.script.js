// Create Fetch API request
var url = 'http://localhost:8080/api/users';
// Create XMLHttpRequest request GET
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        for (var i = 0; i < JSON.parse(xhr.responseText).length; i++) {
            var user = JSON.parse(xhr.responseText)[i];
            document.querySelector("table").innerHTML += "\n                    <tr>\n                        <td>".concat(user.firstName, "</td>\n                        <td>").concat(user.lastName, "</td>\n                    </tr>\n                ");
        }
    }
};
xhr.open('GET', url, true);
xhr.send();
