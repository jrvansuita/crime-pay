
$(document).ready(() => {
    var hookerCardItems = new CardItems();
    var drugsCardItems = new CardItems();

    var formControl = new FormControl()
        .setFormUrl("/club-form")
        .setSubmitUrl("/club-submit")
        .setFormHoldersSelectors(".club-form-holder", ".club-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                hookerCardItems.load();
                drugsCardItems.load();
            }
        })
        .showPlaceholder();


    hookerCardItems.setUrl("/club-hookers")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'hooker' }).load())
        .load();

    drugsCardItems.setUrl("/club-drugs")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".drugs-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'drug' }).load())
        .load(false);


});

