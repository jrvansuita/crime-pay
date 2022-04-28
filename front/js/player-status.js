import { ToolTip } from "./lib/tooltip.js";

ToolTip.init();

export class PlayerStatusUpdater {

    constructor(player) {
        this.player = new PlayerMutation(player);

        if (this.player.isLifeImprisoned()) {
            window.location.replace("/prison");
            return;
        }
    }

    static reload() {
        $('.player-status-holder').parent().load("/player-status", () => {

        });
    }

    badge() {
        $('.player-badge-img').attr('src', this.player.arrested ? '/img/lock.png' : '/img/respect.png')
        $('#player-badge-text').text(this.player.arrested ? $('#player-badge-text').data('def') : this.player.getAttribute('respect').format());
        $('#player-badge-text').parent().toggleClass('bg-danger', this.player?.arrested || false);

        return this;
    }

    coins() {
        $('#status-coins').text(this.player.coins.format());
        return this;
    }

    bars() {
        const exec = (name, min = 40) => {
            $('#status-' + name + '-percent').text(this.player[name] > min ? this.player[name] + '%' : '');
            $("[data-id='status-" + name + "-percent']").text(this.player[name] + '%').toggle(this.player[name] <= min);
            $('#status-' + name).css('width', this.player[name] + '%').attr('aria-valuenow', this.player[name]);
        }

        exec('stamina');
        exec('intoxication');

        return this;
    }

    attributes() {
        $('#status-intelligence').text(this.player.getAttribute('intelligence').format());
        $('#status-dexterity').text(this.player.getAttribute('dexterity').format());
        $('#status-strength').text(this.player.getAttribute('strength').format());
        return this;
    }

    all() {
        this.badge().coins().bars().attributes()
    }
}
