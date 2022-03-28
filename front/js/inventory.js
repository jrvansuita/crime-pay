
$(document).ready(() => {
    const cardItems = new CardsCarousel();

    const onSuccess = (data) => {
        window.toast.pop(data.event.message, data.event.success);

        new PlayerStatusUpdater(data.player).all();

        cardItems.load();
    };

    const form = new BoxControl("/inventory-form")
        .bind(".inventory-form-holder", ".inventory-form-placeholder")
        .addAction('#equip', "/inventory-equip", onSuccess)
        .addAction('#sell', "/inventory-sell", onSuccess)
        .end().show();

    cardItems
        .setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            form.setData({ id: key }).load()
        })
        .load();

});

