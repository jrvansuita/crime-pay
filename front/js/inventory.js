
$(document).ready(() => {
    const cardItems = new CardItems();


    const equipForm = new FormControl()
        .setFormUrl("/inventory-equip-form")
        //.setSubmitUrl("/club-submit")
        .setFormHoldersSelectors(".inventory-equip-form-holder", ".inventory-equip-form-placeholder")
        .setSubmitOptions({
            submit: '#equip',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                cardItems.load();
            }
        })
        .showPlaceholder();



    const sellForm = new FormControl()
        .setFormUrl("/inventory-sell-form")
        //.setSubmitUrl("/club-submit")
        .setFormHoldersSelectors(".inventory-sell-form-holder", ".inventory-sell-form-placeholder")
        .setSubmitOptions({
            submit: '#sell',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                cardItems.load();
            }
        })
        .showPlaceholder();


    cardItems.setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            equipForm.setRequestData({ id: key }).load()
            sellForm.setRequestData({ id: key }).load()
        })
        .load();



});

