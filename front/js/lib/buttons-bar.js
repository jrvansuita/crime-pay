class ButtonsBar {

    constructor(selector) {
        this.setToolbar(selector)
    }

    setToolbar(selector) {
        this.holder = $(selector);
        return this;
    }

    click(selector, listener) {
        $(selector).unbind().click(listener);

        return this;
    }

}


