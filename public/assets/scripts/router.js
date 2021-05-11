function start() {
    var components = [{
            url: "/",
            id: "home"
        },{
            url: "/signout",
            id: "signout"
        },
        {
            url: "/login",
            id: "connect",
        },
        {
            url: "/register",
            id: "register"
        },
        {
            url: "/post/create",
            id: "create_post",
            roles: ["ADMIN"]
        },
        {
            url: "/post",
            id: "post_list",
            roles: ["ADMIN", "USER"]
        },
        {
            url: "/admin/post",
            id: "admin_post_list",
            roles: ["ADMIN"]
        }
    ];
    var token = window.localStorage.getItem("token");
    var role = null;
    var clones = [];

    console.log("function trigger");
    function InitApp(components, role = null) {
        var location = (window.location.pathname || "/") + (window.location.hash || "#/");
        var component = null;
        var isHash = true;

        $(id + " > main").hide();
        for (var i = 0; i < components.length; i++){
            var tmp = components[i];
            var id = "#" + tmp.id;
            
            $(id + " *").off();
            $(id + " > main").hide();
            $(id).addClass("d-none");
        }
        for (var i = 0; i < components.length; i++) {
            var tmp = components[i];
            var id = "#" + tmp.id;
            var tmpUrl = isHash ? "/#" + tmp.url : tmp.url;

            if (tmpUrl === location) {
                if (tmp.roles != null && tmp.roles.length > 0) {
                    if (tmp.roles.indexOf(role) > -1) {
                        component = tmp;
                        $(id).removeClass("d-none");
                        $(id + " > main").fadeIn(800);
                    }
                } else {
                    component = tmp;
                    $(id).removeClass("d-none");
                    $(id + " > main").fadeIn(800);
                }
            }
        }

        if (!component) {
            var event = document.createEvent("Event");
            var key = "created_" + "not_found"

            event.initEvent(key, true, true);

            window.dispatchEvent(event);

            console.log("event fired");
            return ({
                id: "not_found"
            });
        }
        else {
            $("#not_found").remove();
        }

        var event = document.createEvent("Event");
        var key = "created_" + component.id

        event.initEvent(key, true, true);

        window.dispatchEvent(event);

        console.log("event fired");
        return (component);
    }

    if (token !== null) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "http://localhost:3000/api/user/right",
            headers: {
                "Authorization": token
            },
            success: function (data, status, xhr) {
                if (xhr.status === 200) {
                    role = data.role;

                    var tmp = InitApp(components, role);

                    $("#" + tmp.id).removeClass("d-none");
                    $(document.body).fadeIn(800);

                    //   $(document.body).removeClass("d-none");
                }
            },
            error: function (xhr, status, error) {
                var message = xhr.responseJSON.message;

                alert(message);
            }
        });
    } else {
        var tmp = InitApp(components);

        $("#" + tmp.id).removeClass("d-none");
        $(document.body).fadeIn(800);


        //   $(document.body).removeClass("d-none");
    }
}

$(window).on("load", start);
$(window).on("locationchange", start);
$(window).on('hashchange', start);
