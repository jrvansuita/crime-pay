
$(document).ready(() => {
    var marchandiseCardItems = new CardItems();


    var formControl = new FormControl()
        .setFormUrl("/market-form")
        .setSubmitUrl("/market-submit")
        .setFormHoldersSelectors(".market-form-holder", ".market-form-placeholder")
        .setSubmitOptions({
            submit: '#submit',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();
                marchandiseCardItems.load();
            }
        })
        .showPlaceholder();


    marchandiseCardItems.setUrl("/market-merchandise")
        .setLastSelectedVar(lastMarketItemSelected)
        .setHolderSelector(".merchandise-holder")
        .setOnCardSelected(key => formControl.setRequestData({ id: key }).load())
        .load();



});

