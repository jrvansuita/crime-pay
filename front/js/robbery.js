$(document).ready(() => {

    const cardItems = new CardsCarousel();

    const onSuccess = (data) => {
        new RobberyLayoutManager().update(data);

        const update = new PlayerStatusUpdater(data.player);

        if (data.player.arrested) {
            PlayerStatusUpdater.reload()
        } else {
            update.all();
        }

        cardItems.load();
    };

    const form = new FormControl("/robbery-form")
        .bind(".robbery-form-holder", ".robbery-form-placeholder")
        .addAction('#submit', "/robbery-submit", onSuccess)
        .addAction('#submit-full-stamina', "/robbery-submit", onSuccess).putData({ fullStamina: true })
        .show()

    cardItems.setUrl("/robbery-places")
        .setHolderSelector(".places-holder")
        .setOnCardSelected(key => {
            form.setData({ id: key }).load()
        })
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
        $('#result-coins').text(event.data.coins.sign()).parent().toggle(!!event.data.coins);
        $('#result-respect').text(event.data.respect.sign()).parent().toggle(!!event.data.respect);
        $('#result-intelligence').text(event.data.intelligence.sign());
        $('#result-dexterity').text(event.data.dexterity.sign());
        $('#result-strength').text(event.data.strength.sign());
    }


    toggleArrestInfo(data) {
        $('#result-list').parent().removeClass('text-end');
        $('#result-prison').css('display', data.player.arrested ? '-webkit-box' : 'none');
        const defQuote = $('.robbery-result-holder').find('.blockquote-footer').data('def');

        $('.robbery-result-holder').find('.blockquote-footer').text(data.player.arrestRelease?.toDateDisplay(defQuote + ' '))
    }

}