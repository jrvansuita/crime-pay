
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
        thiefStatusUpdate(data.player);

        $(".robbery-result-holder").empty();
        $(".robbery-result-holder").load("/robbery-result?_id=" + data.result._id, function () {
            $(".robbery-result-holder").hide().fadeIn();


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