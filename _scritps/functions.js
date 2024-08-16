/* Cookie Management */
function login() {
    document.cookie = "userState=login; SameSite=Strict";
    window.location.reload(true);
}

function logout() {
    document.cookie = "userState=logout; SameSite=Strict";
    window.location.reload(true);
}

function getUserState() {
    let expresion = new RegExp("userState=([^;]+)");
    let value = expresion.exec(document.cookie);
    return (value != null) ? value[1] : null;
}

$(function() {
        switch (getUserState()) {
            case "login":
                $(".visible-logged").show();
                $(".hidden-logged").hide();
            break;
            case "logout":
                $(".visible-logged").hide();
                $(".hidden-logged").show();
            break;
            default:
                $(".visible-logged").hide();
                $(".hidden-logged").show();
        }

        $(".navigation .dropdown-link").on("mouseenter", function() {
            $(this).next(".dropdown").slideUp();
            $(this).addClass("active");
            $(this).next(".dropdown").addClass("active");
        })

        $(".navigation a").not(".active").on("mouseenter", function() {
            $(".navigation").find(".dropdown.active").slideDown();
            $(".navigation").find(".active").removeClass("active");
        })

        $(".navigation").on("mouseleave", function() {
            $(this).find(".dropdown.active").slideDown();
            $(this).find(".active").removeClass("active");
        })
    }
);