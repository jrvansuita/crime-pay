
$(document).ready(function () {
    reloadRobberyPlaces();
});







function reloadRobberyPlaces() {
    $(".robbery-places-holder .robbery-place-item").remove();
    $(".robbery-places-holder .robbery-place-item-ph").show();

    setTimeout(() => {
        $(".robbery-places-holder").load("/robbery-places", function () {
            $(".robbery-places-holder .robbery-place-item-ph").hide();
            $(".robbery-places-holder").hide().fadeIn();

            $(".robbery-place-item").on("click", onRobberyPlaceItemClick());
            $(".robbery-place-item").first().click().focus();
        });
    }, 1400);
}



function onRobberyPlaceItemClick() {
    return function () {
        var placeId = $(this).data('key');

        $(".robbery-form-holder").load("/robbery-form?_id=" + placeId, function () {
            $(".robbery-form-holder").hide().fadeIn();

            $(".robbery-form-holder").data('place', placeId)
            $('#robbery-submit').click(onRobberySubmit);
        });
    }
}


function onRobberySubmit() {
    var id = $(".robbery-form-holder").data('place');

    $.post("/robbery-submit", { placeId: id }).done(function (data) {
        thiefStatusUpdate(data.player);

        $(".robbery-result-holder").empty();
        $(".robbery-result-holder").load("/robbery-result?_id=" + data.result._id, function () {
            $(".robbery-result-holder").hide().fadeIn();


            reloadRobberyPlaces();
        });
    });
}

function thiefStatusUpdate(player) {
    $('#coins').text(player.coins);
    $('#stamina-percent').text(player.stamina + '%');
    $('#stamina').css('width', player.stamina + '%').attr('aria-valuenow', player.stamina);

    $('#intelligence').text(player.intelligence);
    $('#dexterity').text(player.dexterity);
    $('#strength').text(player.strength);
}