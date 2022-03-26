
module.exports = class Action {

    constructor(player, actionElement) {
        this.player = player;
        this.actionElement = actionElement;
    }

    //Get the interaction element id
    getElementId() {
        return this.actionElement?._id.toString();
    }

    //Get the interaction element name
    getElementName() {
        return this.actionElement?.name.toString();
    }

    //By default, the player had success when not arrested
    success() {
        return !this.update.arrested;
    }

    setUpdate(update) {
        this.update = update;
        return this;
    }

    make(update) {
        return this.setUpdate(update);
    }

    eventData() {
        return { title: this.getElementName(), ...this.getExtraEventData(), ...this.update };
    }

    getExtraEventData() {
        return {};
    }

    get() {
        return this.update;
    }

    check(condition, errorMessage) {
        if (condition) throw new Error(errorMessage);

        return this;
    }

}