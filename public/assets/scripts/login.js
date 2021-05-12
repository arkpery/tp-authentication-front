function start() {

    function redirectOnConnect(){
        var token = window.localStorage.getItem("token");

        if (token && token.length){
            window.location = "/post/list.html";
        }
    }


    $("#connect form #connect").on("click", function (event) {
        var email = $("#connect form #email").val();
        var password = $("#connect form #password").val();
        var user = {
            email: email,
            password: password
        };

        $.ajax({
            method: "POST",
            contentType: "application/json;charset=utf-8",
            url: "http://localhost:3000/api/user/login",
            data: JSON.stringify(user),
            success: function (data, status, xhr) {
                if (xhr.status === 200) {
                    var token = data.token;

                    window.localStorage.setItem("token", token);
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
                                
                                $("#connect form #email").val("");
                                $("#connect form #password").val("");
                                if (role === "USER"){
                                    window.location = "/post/list.html";
                                }
                                else if (role === "ADMIN"){
                                    window.location = "/post/admin_list.html";
                                }
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

                invokeModal(message);
            }
        });
    });

    redirectOnConnect();
}

$(window).on("load", start);
