$(document).ready(() => {
    var miniCards = new MiniCards();

    var formControl = new FormControl()
        .setFormUrl("/robbery-form")
        .setResultUrl("/robbery-submit")
        .setFormHoldersSelectors(".robbery-form-holder", ".robbery-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            payload: (key) => {
                return { placeId: key }
            },
            success: (data) => {
                new RobberyLayoutManager().update(data)
                new PlayerStatusUpdater(data.player).all();
                miniCards.load();
            }
        })
        .showPlaceholder();


    miniCards.setUrl("/robbery-places")
        .setLastSelectedVar(lastPlaceItemSelected)
        .setHolderSelector(".places-holder")
        .setOnCardSelected(key => formControl.setKey(key).load())
        .load();
});

class RobberyLayoutManager {

    update(data) {
        this.toggleArrestInfo(data);
        const event = data.event;

        $('#result-list').hide().fadeIn();
        $('#result-title').text(data.player.arrested ? $('#result-title').data('fail') : $('#result-title').data('success'))

        window.toast.pop(data.event.message, !data.player.arrested);

        $('#result-message').text(event.message)

        $('#result-img').attr('src', ('/img/'.join(event.success ? 'thief-success' : 'police-arrested').join('.png')));
        $('#result-coins').text(event.playerUpdate.coins.sign()).parent().toggle(!!event.playerUpdate.coins);
        $('#result-respect').text(event.playerUpdate.respect.sign()).parent().toggle(!!event.playerUpdate.respect);
        $('#result-intelligence').text(event.playerUpdate.intelligence.sign());
        $('#result-dexterity').text(event.playerUpdate.dexterity.sign());
        $('#result-strength').text(event.playerUpdate.strength.sign());
    }


    toggleArrestInfo(data) {
        $('#result-list').parent().removeClass('text-end');
        $('#result-prison').css('display', data.player.arrested ? '-webkit-box' : 'none');
        const defQuote = $('.robbery-result-holder').find('.blockquote-footer').data('def');

        $('.robbery-result-holder').find('.blockquote-footer').text(data.player.arrestRelease?.toDateDisplay(defQuote + ' '))
    }

}