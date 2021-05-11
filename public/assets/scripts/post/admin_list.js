function start(event) {
    console.log(event);
    var token = window.localStorage.getItem("token");
    $("main #post_list *").remove();
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
                var template = '<div class="card w-100 mb-4">\
                                    <h2 class="card-header w-100"  id="headingOne" >\
                                        ((title))\
                                    </h2>\
                                    <div id="collapseOne" class="card-body w-100">\
                                        <p class="card-text">((content))</p>\
                                        <p class="card-text"><small class="text-muted">((created_at))</small></p>\
                                    </div>\
                                </div>';

                for (var i = 0; i < tab.length; i++){
                    var item = tab[i];
                    var str = template.replace("((title))", item.title);

                    str = str.replace("((content))", item.content);
                    str = str.replace("((created_at))", item.created_at);
                    $("main #post_list").append($(str));
                }
            }
        },
        error: function (xhr, status, error) {
            var message = xhr.responseJSON.message;

            alert(message);
        }
    });
}

$(window).on("created_admin_post_list", start);
