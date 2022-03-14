

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
        $('#result-title').text(data.player.arrested ? "You're under arrest!" : 'You were successful!')

        if (data.player.arrested) {
            window.toast.error(data.event.message);
        } else {
            window.toast.success(data.event.message);
        }

        $('#result-message').text(event.message)

        let randImg = (n) => { return Math.floor((Math.random() * n) + 1); };
        let sign = n => { return n > 0 ? '+ ' + n : n }

        $('#result-img').attr('src', (event.success ? '/img/robbed' + randImg(2) : '/img/busted' + + randImg(4)) + '.png');
        $('#result-coins').text(sign(event.playerUpdate.coins)).parent().toggle(!!event.playerUpdate.coins);
        $('#result-respect').text(sign(event.playerUpdate.respect)).parent().toggle(!!event.playerUpdate.respect);
        $('#result-intelligence').text(sign(event.playerUpdate.intelligence));
        $('#result-dexterity').text(sign(event.playerUpdate.dexterity));
        $('#result-strength').text(sign(event.playerUpdate.strength));
    }


    toggleArrestInfo(data) {
        $('#result-list').parent().removeClass('text-end');
        $('#result-prison').css('display', data.player.arrested ? '-webkit-box' : 'none');
        $('.robbery-result-holder').find('.blockquote-footer').text(data.player.arrested ? 'Released ' + moment(data.player.arrestRelease).calendar() : '');
    }

}

