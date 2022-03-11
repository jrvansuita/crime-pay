
updateThiedStatus(thief) {
    $('#player-badge-text').text(thief.respect);
    $('#stats-coins').text(thief.coins);
    $('#stats-stamina-percent').text(thief.stamina + '%');
    $('#stats-stamina').css('width', thief.stamina + '%').attr('aria-valuenow', thief.stamina);

    $('#stats-intelligence').text(thief.intelligence);
    $('#stats-dexterity').text(thief.dexterity);
    $('#stats-strength').text(thief.strength);
}