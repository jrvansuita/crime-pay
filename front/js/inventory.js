
$(document).ready(() => {
    const cardItems = new CardsCarousel();

    const onSuccess = (data) => {
        window.toast.pop(data.event.message, data.event.success);

        new PlayerStatusUpdater(data.player).all();

        cardItems.load();
    };

    const form = new FormControl("/inventory-form")
        .bind(".inventory-form-holder", ".inventory-form-placeholder")
        .addAction('#equip', "/inventory-equip", onSuccess)
        .addAction('#burn', "/inventory-burn", (data) => {
            window.toast.pop(data.event.message, data.event.success);
            $(".card.selected").remove();
            $(".card.ph").first().remove();
        })
        .addAction('#sell', "/inventory-sell", onSuccess)
        .show()

    cardItems
        .setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            form.setData({ id: key }).load()
        })
        .load();

});

