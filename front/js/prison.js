

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

    attemptHasFailed(attempt, newStats) {
        $('#releaseTime').text(moment(attempt.arrestRelease).calendar());
        $('#escape-coins').text(newStats.escape.coins);
        $('#escape-stamina').text(Math.abs(newStats.escape.stamina) + ' %').parent().toggle(Math.abs(newStats.escape.stamina) > 0);
        $('#escape-respect').text("+ " + newStats.escape.respect);
        $('#escape-chance').text(newStats.escape.escapeChance + ' %');
        $('#escape-inc-days').text(newStats.escape.daysIncOnFail);

        $('#bribe-coins').text(newStats.bribe.coins);
        $('#bribe-stamina').text(Math.abs(newStats.bribe.stamina) + ' %').parent().toggle(Math.abs(newStats.bribe.stamina) > 0);
        $('#bribe-respect').text("+ " + newStats.bribe.respect);

    }

    onReleaseFromPrisonAttempt(path) {
        const _this = this;
        return function () {
            var button = this;
            _this.toggleLoadingButton(button, true);

            setTimeout(() => {
                $.post(path).done((data) => {
                    _this.toggleLoadingButton(button, false);

                    if (data.attempt.success) {
                        window.toast.success(data.attempt.msg)
                        _this.justReleasedFromPrison();
                        new ThiefStatusUpdater(data.player).all();
                    } else {
                        _this.attemptHasFailed(data.attempt, data.newStats);
                        new ThiefStatusUpdater(data.player).coins().bars();
                        window.toast.error(data.attempt.msg)
                    }
                }).fail(function (r) {
                    _this.toggleLoadingButton(button, false);
                    window.toast.error(r.responseText)
                });
            }, 1000);
        }
    }


}