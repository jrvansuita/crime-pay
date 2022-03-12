$(document).ready(() => {

    function justClicked() {
        $('#reset-player-dropdown .no-display').css('display', 'inherit');
        $('#reset-player-dropdown span').last().hide();
    }

    function onFinished() {
        $('#reset-player-dropdown .no-display').css('display', 'none');
        $('#reset-player-dropdown span').last().show();
    }

    function onResetClick(path) {
        return () => {
            justClicked();

            setTimeout(() => {
                $.post(path).done(onFinished);
            }, 400);
        }
    }


    $('#reset').click(onResetClick("/settings-reset"));
    $('#reset-prisoner').click(onResetClick("/settings-reset-prisoner"));
});