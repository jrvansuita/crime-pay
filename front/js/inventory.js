
$(document).ready(() => {
    const cardItems = new CardsCarousel();


    const form = new FormControl()
        .setFormUrl("/inventory-form")
        //.setSubmitUrl("/club-submit")
        .setFormHoldersSelectors(".inventory-form-holder", ".inventory-form-placeholder")
        .setSubmitOptions({
            submit: '#equip',
            success: (data) => {
                window.toast.pop(data.event.message, data.event.success);

                new PlayerStatusUpdater(data.player).all();

                cardItems.load();
            }
        })
        .showPlaceholder();

    cardItems
        .setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            form.setRequestData({ id: key }).load()
        })
        .load();



});

