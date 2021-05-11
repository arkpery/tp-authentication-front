function start() {
    var token = window.localStorage.getItem("token");

    console.log(token);
    function createLi(link){
        var li = $("<li>");
        var a = $("<a>");

        li.addClass("navbar-item");
        a.addClass("nav-link");
        a.addClass("active");
        a.addClass("text-white");
        a.attr("href", link.url);
        a.text(link.name);
        li.append(a);
        return (li);
    }

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "http://localhost:3000/api/user/right",
        headers: {
            "Authorization": token
        },
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                var ref = $("#home ul");
                var els = [{url: "/#/", name: "Home"}, {url: "/#/post", name: "Articles"}, {url: "/#/signout", name: "Se déconnecter"}];

                $("#home ul li").remove();
                for (var i = 0; i < els.length; i++){
                    var el = els[i];
                    var li = createLi(el);

                    console.log(li);
                    ref.append(li);
                }
                if (data.role === "ADMIN"){
                    var li = createLi("/#/post/create");

                    console.log(li);
                    ref.append(li);
                }
            }
        },
        error: function (xhr, status, error) {
            var ref = $("#home ul");
            var els = [{url: "/#/", name: "Home"}, {url: "/#/login", name: "Se connecter"}];

            $("#home ul li").remove();
            for (var i = 0; i < els.length; i++){
                var el = els[i];
                var li = createLi(el);

                console.log(li);
                ref.append(li);
            }
        }
    });
}

$(window).on("created_home", start);