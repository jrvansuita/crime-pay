

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
        const escapeData = newAttempt.escape.update;
        const bribeData = newAttempt.bribe.update;

        $('#releaseTime').text(player.arrestRelease.toDateDisplay());
        $('#escape-coins').text(escapeData.coins?.sign());
        $('#escape-stamina').text(escapeData.stamina.abs() + '%').parent().toggle(escapeData.stamina.abs().positive());
        $('#escape-respect').text(escapeData.respect?.sign());
        $('#escape-chance').text(newAttempt.escape.escapeChance + '%');

        let quoteUnformated = $('#escape-holder .blockquote-footer').data('def');

        $('#escape-holder .blockquote-footer').text(quoteUnformated.format(newAttempt.escape.daysIncOnFail));

        $('#bribe-coins').text(bribeData.coins?.format());
        $('#bribe-stamina').text(bribeData.stamina.abs() + '%').parent().toggle(bribeData.stamina.abs().positive());
        $('#bribe-respect').text("+ " + bribeData.respect?.format());

    }

    onReleaseFromPrisonAttempt(path) {
        const _this = this;
        return function () {
            var button = this;
            _this.toggleLoadingButton(button, true);

            setTimeout(() => {
                $.post(path).done((data) => {
                    _this.toggleLoadingButton(button, false);
                    window.toast.pop(data.event.message, data.event.success);

                    if (data.event.success) {
                        _this.justReleasedFromPrison();
                        new PlayerStatusUpdater(data.player).all();
                    } else {
                        _this.attemptHasFailed(data);
                        new PlayerStatusUpdater(data.player).coins().bars();
                    }
                }).fail(function (r) {
                    _this.toggleLoadingButton(button, false);
                    window.toast.error(r.responseText)
                });
            }, 400);
        }
    }


}