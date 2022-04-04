
$(document).ready(() => {
    const keepTag = 'club';

    const hookersCarousel = new CardsCarousel(keepTag);
    const drugsCarousel = new CardsCarousel(keepTag);

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
        .setHolderSelector(".hookers-holder")
        .setOnCardSelected(key => form.setData({ id: key, type: 'hooker' }).load())
        .load();

    drugsCarousel.setUrl("/club-drugs")
        .setHolderSelector(".drugs-holder")
        .setOnCardSelected(key => form.setData({ id: key, type: 'drug' }).load())
        .load();


});

