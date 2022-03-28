
$(document).ready(() => {
    var hookersCarousel = new CardsCarousel();
    var drugsCarousel = new CardsCarousel();

    var formControl = new FormControl()
        .setFormUrl("/club-form")
        .setSubmitUrl("/club-submit")
        .setFormHoldersSelectors(".club-form-holder", ".club-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                hookersCarousel.load();
                drugsCarousel.load();
            }
        })
        .showPlaceholder();


    hookersCarousel.setUrl("/club-hookers")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'hooker' }).load())
        .load();

    drugsCarousel.setUrl("/club-drugs")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".drugs-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'drug' }).load())
        .load(false);


});

