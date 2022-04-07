// Function to get the current token
function getCookie(cookie) {
    // Divides the cookie string and retrieves all individual name=value pairs in an array and split it
    var cookieArr = document.cookie.split(";");
    // Loop through the elements of the table
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        // Removes the spaces at the beginning of the cookie name and compares it with the given string
        if (cookie == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if the cookie is not found
    return null;
}
// Function to check if the user is logged in
function checkCookie() {
    var token = getCookie("token");
    // console.log(token);
    // return token;
    // If token is not null return true
    return token != null;
}
