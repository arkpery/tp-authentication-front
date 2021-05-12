function start(event) {
    console.log(event);
    var token = window.localStorage.getItem("token");
    $("main #post_list table tbody *").remove();
    $.ajax({
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": token
        },
        url: "http://localhost:3000/api/posts",
        success: function (data, status, xhr) {
            console.log(xhr);
            if (xhr.status === 200) {
                var tab = data;
                
                var template = '<tr>\
                                    <td>((title))</td>\
                                    <td>((content))</td>\
                                    <td>((created_at))</td>\
                                    <td><button class="btn btn-danger">Supprimer</button>\
                                </tr>';

                for (var i = 0; i < tab.length; i++){
                    var item = tab[i];
                    var str = template.replace("((title))", item.title);

                    str = str.replace("((content))", item.content);
                    str = str.replace("((created_at))", item.created_at);
                    $("main #post_list table tbody").append($(str));
                }
                
            }
        },
        error: function (xhr, status, error) {
            var message = xhr.responseJSON.message;

            invokeModal(message);
        }
    });
}

$(window).on("load", start);
