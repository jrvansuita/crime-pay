
$(document).ready(() => {
    const keepTag = 'market';
    const merchandises = new CardsCarousel(keepTag)
        .setUrl("/market-merchandise")
        .setHolderSelector(".merchandise-holder")
        .setOnCardSelected(key => form.setData({ id: key, newItem: true }).load())

    const form = new FormControl("/market-form")
        .bind(".market-form-holder", ".market-form-placeholder")
        .addAction('#submit', "/market-submit", (data) => {
            window.toast.pop(data.event.message, data.event.success);

            new PlayerStatusUpdater(data.player).all();
            merchandises.load();
        })
        .show()



    merchandises.load();

    new CardsCarousel(keepTag)
        .setUrl("/market-items")
        .setHolderSelector(".market-holder")
        .setOnCardSelected(key => form.setData({ id: key, newItem: false }).load())
        .load()

});

