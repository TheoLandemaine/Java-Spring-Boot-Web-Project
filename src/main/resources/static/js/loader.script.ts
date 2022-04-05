function load(url) {
    console.log("Loading " + url);
    const req: XMLHttpRequest = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);

    return req.responseText;
}

// Load all Includes
document.querySelector(`head`).innerHTML += load("./inc/head.html");
document.querySelector(`nav`).innerHTML += load("./inc/nav.html");
document.querySelector(`footer`).innerHTML += load("./inc/footer.html");

// Remove the script tag
document.querySelector("#loader").remove();
