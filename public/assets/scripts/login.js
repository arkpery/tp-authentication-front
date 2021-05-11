function start() {

    function redirectOnConnect(){
        var token = window.localStorage.getItem("token");

        if (token && token.length){
            window.location = "/#/post";
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
                                    window.location = "/#/post";
                                }
                                else if (role === "ADMIN"){
                                    window.location = "/#/admin/post";
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            var message = xhr.responseJSON.message;
            
                            alert(message);
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                var message = xhr.responseJSON.message;

                alert(message);
            }
        });
    });

    redirectOnConnect();
}

$(window).on("created_connect", start);
