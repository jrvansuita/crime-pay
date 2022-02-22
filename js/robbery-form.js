
$(document).ready(function () {
    $(".robbery-place-item").on("click", function () {
        $(this).focus();
        $(".robbery-form-holder").empty();
        $(".robbery-form-holder").load("/robbery-form?_id=" + $(this).data('key'), function () {
            $(".robbery-form-holder").hide().fadeIn();
        });
    });

    $(".robbery-place-item").first().click().focus()

});


