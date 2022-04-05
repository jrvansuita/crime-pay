import { RequestButton } from "./lib/request-button.js";
import { PlayerStatusUpdater } from "./player-status.js";

$(document).ready(function () {


    const justReleasedFromPrison = () => {
        $('#releaseTime').parent().remove();
        $('#escape-holder').parent().remove();
        $('#bribe-holder').parent().remove();
        $('#free-holder').parent().hide().fadeIn();
    };


    const attemptHasFailed = ({ player, newAttempt }) => {
        const escapeData = newAttempt.escape.update;
        const bribeData = newAttempt.bribe.update;

        $('#releaseTime').text(player.arrestRelease.toDateDisplay());
        $('#escape-coins').text(escapeData.coins?.sign());
        $('#escape-stamina').text(escapeData.stamina.abs() + '%').parent().toggle(escapeData.stamina.abs().positive());
        $('#escape-respect').text(escapeData.respect?.sign());
        $('#escape-chance').text(newAttempt.escape.escapeChance + '%');

        let quoteUnFormatted = $('#escape-holder .blockquote-footer').data('def');

        $('#escape-holder .blockquote-footer').text(quoteUnFormatted.format(newAttempt.escape.daysIncOnFail));

        $('#bribe-coins').text(bribeData.coins?.format());
        $('#bribe-stamina').text(bribeData.stamina.abs() + '%').parent().toggle(bribeData.stamina.abs().positive());
        $('#bribe-respect').text("+ " + bribeData.respect?.format());

    }

    const onSuccess = (data) => {
        window.toast.pop(data.event.message, data.event.success);
        new PlayerStatusUpdater(data.player).all();

        if (data.event.success) {
            justReleasedFromPrison();
        } else {
            attemptHasFailed(data);
        }
    };


    new RequestButton('#escape', "/escape-attempt", onSuccess).bindClick().delayed();
    new RequestButton('#bribe', "/bribe-attempt", onSuccess).bindClick().delayed();
});
