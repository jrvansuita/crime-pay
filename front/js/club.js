
$(document).ready(() => {
    var hookersCarousel = new CardsCarousel();
    var drugsCarousel = new CardsCarousel();

    const form = new FormControl("/club-form")
        .bind(".club-form-holder", ".club-form-placeholder")
        .addAction('#submit', "/club-submit", (data) => {
            window.toast.pop(data.event.message, data.event.success);

            new PlayerStatusUpdater(data.player).all();

            hookersCarousel.load();
            drugsCarousel.load();
        })
        .show()

    hookersCarousel.setUrl("/club-hookers")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => form.setData({ id: key, type: 'hooker' }).load())
        .load();

    drugsCarousel.setUrl("/club-drugs")
        .setLastSelectedVar(lastClubItemSelected)
        .setHolderSelector(".drugs-holder")
        .setOnCardSelected(key => form.setData({ id: key, type: 'drug' }).load())
        .load(false);


});

