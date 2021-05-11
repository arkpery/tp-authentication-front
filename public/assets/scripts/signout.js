function start() {
    window.localStorage.clear();
    window.location = "/#/login";
}

$(window).on("created_signout", start);
