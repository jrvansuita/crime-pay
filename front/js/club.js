


$(document).ready(() => {
    var miniCards = new MiniCards();

    var formControl = new FormControl()
        .setFormUrl("/club-form")
        .setResultUrl("/club-submit")
        .setFormHoldersSelectors(".club-form-holder", ".club-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            payload: (key) => {
                return { hookerId: key }
            },
            success: (data) => {
                if (data.event.success) {
                    window.toast.success(data.event.message)
                } else {
                    window.toast.error(data.event.message)
                }

                new PlayerStatusUpdater(data.player).coins().bars();
                miniCards.load();
            }
        })
        .showPlaceholder();


    miniCards.setUrl("/club-hookers")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => formControl.setKey(key).load())
        .load();



});

