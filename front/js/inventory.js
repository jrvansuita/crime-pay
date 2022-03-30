
$(document).ready(() => {
    const cardItems = new CardsCarousel();


    const form = new FormControl("/inventory-form")
        .bind(".inventory-form-holder", ".inventory-form-placeholder")
        .addAction('#equip', "/inventory-equip", (data) => {
            window.toast.success(data.message);
            new PlayerStatusUpdater(data.player).all();
            cardItems.load();
        })
        .addAction('#burn', "/inventory-burn", (data) => {
            window.toast.pop(data.event.message, data.event.success);
            cardItems.removeSelected();

        })
        .addAction('#sell', "/inventory-sell")
        .show()

    cardItems
        .setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            form.setData({ id: key }).load()
        })
        .load();

});

