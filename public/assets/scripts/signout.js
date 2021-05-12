function start() {
    window.localStorage.clear();
    window.location = "/login.html";
}

$(window).on("load", start);
