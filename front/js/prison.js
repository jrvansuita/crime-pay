

$(document).ready(function () {
    new PrisonLayoutManager().initialize();
});

class PrisonLayoutManager {

    initialize() {
        $('#escape').on("click", this.onReleaseFromPrisonAttempt("/escape-attempt"));
        $('#bribe').on("click", this.onReleaseFromPrisonAttempt("/bribe-attempt"));
    }

    toggleLoadingButton(button, show) {
        $(button).prop('disabled', show);
        $(button).find('.no-display').css('display', show ? 'inherit' : 'none');
        $(button).find('.button-text').toggle(!show);
    }


    justReleasedFromPrison() {
        $('#releaseTime').parent().remove();
        $('#escape-holder').parent().remove();
        $('#bribe-holder').parent().remove();
        $('#free-holder').parent().hide().fadeIn();
    }

    attemptHasFailed({ player, newAttempt }) {

        const newArrestDate = player.arrestRelease;

        const escapeData = newAttempt.escape.data;
        const bribeData = newAttempt.bribe.data;

        $('#releaseTime').text(moment(newArrestDate).calendar());
        $('#escape-coins').text(escapeData.coins);
        $('#escape-stamina').text(Math.abs(escapeData.stamina) + ' %').parent().toggle(Math.abs(escapeData.stamina) > 0);
        $('#escape-respect').text("+ " + escapeData.respect);
        $('#escape-chance').text(newAttempt.escape.escapeChance + ' %');
        $('#escape-holder .blockquote-footer').text("Adding + " + newAttempt.escape.daysIncOnFail + " jail day when fail.");

        $('#bribe-coins').text(bribeData.coins);
        $('#bribe-stamina').text(Math.abs(bribeData.stamina) + ' %').parent().toggle(Math.abs(bribeData.stamina) > 0);
        $('#bribe-respect').text("+ " + bribeData.respect);

    }

    onReleaseFromPrisonAttempt(path) {
        const _this = this;
        return function () {
            var button = this;
            _this.toggleLoadingButton(button, true);

            setTimeout(() => {
                $.post(path).done((data) => {
                    _this.toggleLoadingButton(button, false);

                    if (data.event.success) {
                        window.toast.success(data.event.message)
                        _this.justReleasedFromPrison();
                        new PlayerStatusUpdater(data.player).all();
                    } else {
                        _this.attemptHasFailed(data);
                        new PlayerStatusUpdater(data.player).coins().bars();
                        window.toast.error(data.event.message)
                    }
                }).fail(function (r) {
                    _this.toggleLoadingButton(button, false);
                    window.toast.error(r.responseText)
                });
            }, 400);
        }
    }


}