function start() {

    function redirectOnConnect(){
        var token = window.localStorage.getItem("token");

        if (token && token.length){
            window.location = "/post/list.html";
        }
    }

    $("#register form #register").on("click", function (event) {
        var email = $("#register form input#email").val();
        var password = $("#register form input#password").val();
        var confirmation = $("#register form input#confirmation").val();
        var user = {
            email: email,
            password: password
        };

        $("#register .error-message").text("");
        if (confirmation !== password){
            $("#register .error-message").text("Les mots de passe ne correspondent pas !");
            return;
        }
        $.ajax({
            contentType: "application/json;charset=utf-8",
            method: "POST",
            url: "http://localhost:3000/api/user/register",
            data: JSON.stringify(user),
            success: function (data, status, xhr) {
                if (xhr.status === 201) {
                    $.ajax({
                        method: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "http://localhost:3000/api/user/login",
                        data: JSON.stringify(user),
                        success: function (data, status, xhr) {
                            if (xhr.status === 200) {
                                var token = data.token;

                                $("#register form input#email").val("");
                                $("#register form input#password").val("");
                                $("#register form input#confirmation").val("");
                                window.localStorage.setItem("token", token);
                                window.location = "/post/list.html";
                            }
                        },
                        error: function (xhr, status, error) {
                            var message = xhr.responseJSON.message;

                            invokeModal(message);
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                var message = xhr.responseJSON.message;

               //alert(message);
               invokeModal(message);
            }
        });
    });

    redirectOnConnect();
}

$(window).on("load", start);
