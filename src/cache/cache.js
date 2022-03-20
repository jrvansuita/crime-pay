const phrase = require("../const/phrase");

module.exports = class Cache {

    constructor(storage) {
        if (!storage) throw new Error(phrase.NO_CACHE_STORAGE);

        this.storage = storage;
        this.lastKey = null;
        this.autoClear(true).clearAfter(10);
    }

    autoClear(clear) {
        this.clear = clear;
        return this;
    }

    clearAfter(minutes) {
        this.clearMinutes = minutes;
        return this;
    }

    clearLast(key) {
        if (this.clear) delete this.storage[this.lastKey];
    }

    getDefaultKey() {
        return Math.trunc(new Date().getMinutes() / (this.clearMinutes));
    }

    set(data, key = this.getDefaultKey()) {
        if (!this.has(key)) {
            this.clearLast();
            this.storage[key] = data;
            this.lastKey = key;
        }
    }

    get(key = this.getDefaultKey()) {
        return this.storage[key];
    }

    has(key = this.getDefaultKey()) {
        return !!this.storage[key];
    }

}