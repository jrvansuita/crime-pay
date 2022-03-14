


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
                //new RobberyLayoutManager().update(data.result)

                console.log(data);
                window.toast.success(data.event.message)
                new PlayerStatusUpdater(data.player).all();
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

