
$(document).ready(() => {
    const carousel = new CardsCarousel();


    const form = new FormControl("/market-form")
        .bind(".market-form-holder", ".market-form-placeholder")
        .addAction('#submit', "/market-submit", (data) => {
            window.toast.pop(data.event.message, data.event.success);

            new PlayerStatusUpdater(data.player).all();
            carousel.load();
        })
        .show()


    carousel.setUrl("/market-merchandise")
        .setLastSelectedVar(lastMarketItemSelected)
        .setHolderSelector(".merchandise-holder")
        .setOnCardSelected(key => form.setData({ id: key }).load())
        .load();

});

