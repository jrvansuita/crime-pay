
$(document).ready(() => {
    const cardItems = new CardsCarousel();

    const form = new FormControl("/inventory-form")
        .bind(".inventory-form-holder", ".inventory-form-placeholder")
        .addAction('#equip', "/inventory-equip", (data) => {
            window.toast.success(data.message);
            PlayerStatusUpdater.reload();
            cardItems.load();
        })
        .addAction('#burn', "/inventory-burn", (data) => {
            window.toast.pop(data.event.message, data.event.success);
            cardItems.removeSelected();

        })
        .addAction('#sell', "/inventory-sell", (data) => {
            window.toast.pop(data.event.message, data.event.success);
            cardItems.load();
        })
        .onValidate(() => {
            return ($('#price').val()?.toNumber?.() > 0)
        })
        .onData(() => {
            return { price: $('#price').val() }
        })
        .addAction('#remove-sell', "/inventory-sell", (data) => {
            window.toast.pop(data.event.message, data.event.success);
            cardItems.load();
        })

        .show()

    cardItems
        .setUrl("/inventory-weapons")
        .setHolderSelector(".weapons-holder")
        .setOnCardSelected(key => {
            form.setData({ id: key }).load()
        })
        .setOnEmpty(() => {
            $('#empty-holder').fadeIn();
            $('#weapon-types-filter').remove();
            form.hide();
        })
        .load();


    new ButtonsBar('#weapon-types-filter')
        .click('#all', () => {
            $(".big-card:not(.ph)").show();
        })
        .click('#weapons', () => {
            $(".big-card").hide();
            $(".big-card[data-extra='weapon']").show();
        })
        .click('#items', () => {
            $(".big-card").hide();
            $(".big-card[data-extra='special-item']").show();
        })

});

