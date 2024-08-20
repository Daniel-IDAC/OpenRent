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
    //return "login";
    //return "logout";
}

$(function() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        breakpoints: {
            576: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

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

    $("#overlay-background").on("click", function() {
        switch ($(this).attr("data-trigger-type")) {
            case "flyout":
                closeFlyout($(this).attr("data-trigger-id"));
            break;
            default:
                toggleOverlayBackground();
        }
    });
    
    $(".user-settings-wrapper").on("click", function() {
        $(this).children(".user-settings").show();
        $("#user-settings-overlay-background").show();
    });
    
    $("#user-settings-overlay-background").on("click", function() {
        $(".user-settings-wrapper .user-settings").hide();
        $("#user-settings-overlay-background").hide();
    });

    $(".dropdown-link").on("mouseenter", function() {
        $(this).children(".dropdown").slideDown()
    });

    $(".dropdown").on("mouseleave", function() {
        $(this).slideUp()
    });
});

function openFlyout(id) {
    if ($("#" + id).hasClass("right")) {
        $("#" + id).css("right", 0);
    }
    else {
        $("#" + id).css("left", 0);
    }
    
    $("#overlay-background").attr("data-trigger-id", id);
    $("#overlay-background").attr("data-trigger-type", "flyout");
    toggleOverlayBackground();
}

function closeFlyout(id) {
    if ($("#" + id).hasClass("right")) {
        $("#" + id).css("right", -500);
    }
    else {
        $("#" + id).css("left", -500);
    }
    toggleOverlayBackground();
}

function toggleOverlayBackground() {
    $("#overlay-background").toggle();
    $(".user-settings-wrapper .user-settings").hide();
    $("#user-settings-overlay-background").hide();
}