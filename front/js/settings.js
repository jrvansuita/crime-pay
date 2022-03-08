$(document).ready(function () {
    $('#reset').click(() => {

        $('#reset .no-display').css('display', 'inherit');
        $('#reset span').last().hide();

        setTimeout(() => {
            $.post("/settings-reset").done((data) => {
                $('#reset .no-display').css('display', 'none');
                $('#reset span').last().show();
            });
        }, 2000);

    })
});