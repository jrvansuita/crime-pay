import { Keep } from './keep.js';


export class CardsCarousel {

    constructor(tag) {
        this.keep = new Keep(tag);
        this.setLoadDelay(200);
    }

    setLoadDelay(loadDelay) {
        this.loadDelay = loadDelay;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setHolderSelector(selector) {
        this.holder = $(selector);

        if (!this.keep.tag) this.keep.setTag(selector);

        return this.setCardsSelector(selector + ' .card:not(.ph)');
    }

    setCardsSelector(selector) {
        this.cardsSelector = selector;
        return this;
    }

    setOnEmpty(onEmpty) {
        this.onEmpty = onEmpty;
        return this;
    }

    setOnShowItems(onShowItems) {
        this.onShowItems = onShowItems;
        return this;
    }

    onBeforeLoad() {
        $(this.cardsSelector).remove();
        this.holder.find('.ph.card').show();
    }

    onAfterLoad() {
        $(this.cardsSelector).hide().fadeIn();
        this.holder.find('.ph.card').hide();

        if ($(this.cardsSelector).length) {
            if (this.onShowItems) this.onShowItems()
        } else {
            if (this.onEmpty) this.onEmpty()
        }
    }

    setOnCardSelected(onCardSelected) {
        this.onCardSelected = onCardSelected;
        return this;
    }

    onInnerCardSelected() {
        const self = this;
        return function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();

            const currentCardSelected = $(this).data('key');
            const lastCardSelected = self.keep.get();
            const hasSelectedAnother = lastCardSelected !== currentCardSelected;

            if (hasSelectedAnother || ($(self.cardsSelector + '.selected').length === 0)) {

                $('.card-carousel .card').removeClass('selected');
                $(this).addClass('selected')

                self.keep.set(currentCardSelected);

                if (self.onCardSelected) {
                    self.onCardSelected(currentCardSelected);
                }
            }

            return true;
        }
    }


    removeSelected(...p) {
        this.remove(this.keep.get(), ...p);
    }

    remove(key, onRemoved, selectOther = true) {
        const self = this;

        this.holder.find("[data-key='" + key + "']").fadeOut(300, function () {
            $(this).remove()

            if (selectOther) self.autoSelectOne();
            if (onRemoved) onRemoved();
        });

        this.holder.find(".card.ph").first().remove();
    }


    autoSelectOne() {
        Util.sleep(100).then(() => {
            $(this.cardsSelector).first().add("[data-key='" + this.keep.get() + "']").last().click()
        })
    }


    load(autoSelect = true) {
        this.onBeforeLoad();

        setTimeout(() => {
            this.holder.load(this.url, () => {
                this.onAfterLoad();

                $(this.cardsSelector).unbind().click(this.onInnerCardSelected());

                if (autoSelect) {
                    this.autoSelectOne();
                }
            });
        }, this.loadDelay);
    }

}

