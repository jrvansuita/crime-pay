
class ThiefStatusUpdater {

    constructor(thief) {
        this.thief = thief;
    }

    badge() {
        $('#player-badge-text').text(this.thief.respect);
        $('.player-badge-img').attr('src', '/img/respect-star.png')
        $('#player-badge-text').parent().removeClass('bg-danger');
        return this;
    }

    coins() {
        $('#status-coins').text(this.thief.coins);
        return this;
    }

    bars() {
        $('#status-stamina-percent').text(this.thief.stamina + '%');
        $('#status-stamina').css('width', this.thief.stamina + '%').attr('aria-valuenow', this.thief.stamina);
        $('#status-intoxication-percent').text(this.thief.stamina + '%');
        $('#status-intoxication').css('width', this.thief.stamina + '%').attr('aria-valuenow', this.thief.stamina);

        return this;
    }

    attributes() {
        $('#status-intelligence').text(this.thief.intelligence);
        $('#status-dexterity').text(this.thief.dexterity);
        $('#status-strength').text(this.thief.strength);
        return this;
    }

    all() {
        this.badge().coins().bars().attributes();
    }
}
