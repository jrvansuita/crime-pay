import { CardsCarousel } from "./lib/cards-carousel.js";
import { FormControl } from "./lib/form-control.js";
import { PlayerStatusUpdater } from "./player-status.js";

$(document).ready(() => {


    const keepTag = 'market';
    const merchandises = new CardsCarousel(keepTag)
        .setUrl("/market-merchandise")
        .setHolderSelector(".merchandise-holder")
        .setOnCardSelected(key => form.setData({ id: key, newItem: true }).load())

    const weapons = new CardsCarousel(keepTag)
        .setUrl("/market-weapons")
        .setHolderSelector(".market-holder")
        .setOnCardSelected(key => form.setData({ id: key, newItem: false }).load())
        .setOnShowItems(() => {
            $('.hood-equip-title').css('visibility', 'visible').hide().fadeIn();
        })
        .setOnEmpty(() => {
            $('.hood-equip-title').css('visibility', 'hidden');
        })


    const form = new FormControl("/market-form")
        .bind(".market-form-holder", ".market-form-placeholder")
        .addAction('#submit', "/market-submit", (data) => {
            window.toast.pop(data.event.message, data.event.success);

            new PlayerStatusUpdater(data.player).all();

            if (form.getData().newItem) {
                merchandises.load();
            } else {
                weapons.load();
            }
        })
        .show()


    merchandises.load();
    weapons.load(false);

});

