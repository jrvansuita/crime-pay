
$(document).ready(() => {
    var marchandiseMiniCards = new MiniCards();


    var formControl = new FormControl()
        .setFormUrl("/market-form")
        .setResultUrl("/market-submit")
        .setFormHoldersSelectors(".market-form-holder", ".market-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            success: (data) => {
                if (data.event.success) {
                    window.toast.success(data.event.message)
                } else {
                    window.toast.error(data.event.message)
                }

                new PlayerStatusUpdater(data.player).all();

                marchandiseMiniCards.load();
            }
        })
        .showPlaceholder();


    marchandiseMiniCards.setUrl("/market-merchandise")
        .setLastSelectedVar(lastMarketItemSelected)
        .setHolderSelector(".merchandise-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key }).load())
        .load();



});

