
$(document).ready(() => {
    var hookerMiniCards = new MiniCards();
    var drugsMiniCards = new MiniCards();

    var formControl = new FormControl()
        .setFormUrl("/club-form")
        .setResultUrl("/club-submit")
        .setFormHoldersSelectors(".club-form-holder", ".club-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                hookerMiniCards.load();
                drugsMiniCards.load();
            }
        })
        .showPlaceholder();


    hookerMiniCards.setUrl("/club-hookers")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'hooker' }).load())
        .load();

    drugsMiniCards.setUrl("/club-drugs")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".drugs-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key, type: 'drug' }).load())
        .load(false);


});

