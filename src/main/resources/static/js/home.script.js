for (var i = 1; i <= 10; i++) {
    console.log(i);
    $('.carousel').append("<div id=\"img".concat(i, "\" class=\"item\"></div>"));
}
