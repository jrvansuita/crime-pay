
class PlayerStatusUpdater {

    constructor(player) {
        this.player = player;

        if (player.lifeImprisonment) {
            window.location.replace("/prison");
        }
    }

    badge() {
        $('.player-badge-img').attr('src', this.player.arrested ? '/img/lock.png' : '/img/respect-star.png')
        $('#player-badge-text').text(this.player.arrested ? $('#player-badge-text').data('def') : this.player.respect.format());
        $('#player-badge-text').parent().toggleClass('bg-danger', this.player.arrested);

        return this;
    }

    coins() {
        $('#status-coins').text(this.player.coins.format());
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
        $('#status-intelligence').text(this.player.intelligence.format());
        $('#status-dexterity').text(this.player.dexterity.format());
        $('#status-strength').text(this.player.strength.format());
        return this;
    }

    all() {
        this.badge().coins().bars().attributes()
    }
}
