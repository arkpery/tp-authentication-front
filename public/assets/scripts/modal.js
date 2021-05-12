function invokeModal(message){
    var root = $("<div>");
    var container = $("<div>");
    var el = $("<div>");
    var p = $("<p>");
    var button = $("<button>");

    button.text("Fermer");
    button
        .addClass("btn")
        .addClass("btn-danger")
        .addClass("w-25");
    button.on("click", () => {
        container.remove();
        $("body > div").css("opacity", "1");
    });
    p.text(message);
    el.append(p);
    container.append(el);
    container.append(button);
    root.append(container);
    $(document.body).append(root);
    root.addClass("d-none");
    root.addClass("container");
    root.addClass("w-100");
    root.addClass("d-flex").addClass("justify-content-center");
    container.addClass("bg-white");
    container.css("border-radius", "10px");
    container.addClass("p-4");
    container.addClass("h-50");
    p.css("color", "red");
    p.addClass("text-center");
    el.addClass("p-4");
    el.addClass("m-4");
    el.addClass("d-none");
    el.addClass("d-flex").addClass("justify-content-center");
    container.addClass("d-none");
    container.css("position", "absolute");
    container.css("bottom", "0%");
    container.css("z-index", "100");
    container
        .addClass("d-flex")
        .addClass("justify-content-center")
        .addClass("flex-column");
    container.addClass("text-center");
    el.addClass("d-flex").addClass("justify-content-center");
    button.addClass("align-self-center");
    el.css("font-size", "3em");
    el.css("font-family", "Comic Sans MS");
    $("body > div").css("opacity", "0.2");
    $(root).css("opacity", 1);
    container.addClass("w-50");
    root.removeClass("d-none");
    container.removeClass("d-none");
    el.removeClass("d-none");
    container.animate({
        "bottom": "25%"
    });
}