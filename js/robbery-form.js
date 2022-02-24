
$(document).ready(function () {
    $(".robbery-place-item").on("click", function () {
        var placeId = $(this).data('key');
        $(this).focus();
        $(".robbery-form-holder").empty();
        $(".robbery-form-holder").load("/robbery-form?_id=" + placeId, function () {
            $(".robbery-form-holder").hide().fadeIn();
            $(".robbery-form-holder").data('place', placeId)
            $('#robbery-submit').click(onRobberySubmit);
        });
    });

    $(".robbery-place-item").first().click().focus()
});



function onRobberySubmit() {
    var id = $(".robbery-form-holder").data('place');

    $.post("/robbery-submit", { placeId: id }).done(function (data) {
        alert("Data Loaded: " + data);
    });
}