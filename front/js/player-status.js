
class PlayerStatusUpdater {

    constructor(player) {
        this.player = player;
    }

    badge() {
        $('#player-badge-text').text(this.player.respect);
        $('.player-badge-img').attr('src', '/img/respect-star.png')
        $('#player-badge-text').parent().removeClass('bg-danger');
        return this;
    }

    coins() {
        $('#status-coins').text(this.player.coins);
        return this;
    }

    bars() {
        $('#status-stamina-percent').text(this.player.stamina + '%');
        $('#status-stamina').css('width', this.player.stamina + '%').attr('aria-valuenow', this.player.stamina);
        $('#status-intoxication-percent').text(this.player.intoxication + '%');
        $('#status-intoxication').css('width', this.player.intoxication + '%').attr('aria-valuenow', this.player.intoxication);

        return this;
    }

    attributes() {
        $('#status-intelligence').text(this.player.intelligence);
        $('#status-dexterity').text(this.player.dexterity);
        $('#status-strength').text(this.player.strength);
        return this;
    }

    all() {
        this.badge().coins().bars().attributes();
    }
}
