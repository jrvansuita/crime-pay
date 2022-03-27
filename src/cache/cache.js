const phrase = require("../const/phrase");

module.exports = class Cache {

    constructor(storage, clearAfter = 10) {
        if (!storage) throw new Error(phrase.NO_CACHE_STORAGE);

        this.storage = storage;
        this.lastKey = null;
        this.autoClear(true).clearAfter(clearAfter);
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
            this.storage[key] = data.deepCopy();
            this.lastKey = key;
        }
    }

    get(key = this.getDefaultKey()) {
        return this.storage[key].deepCopy();
    }

    has(key = this.getDefaultKey()) {
        return !!this.storage[key];
    }


    expired(cacheOrThrow, id) {
        if (cacheOrThrow) {
            if (!this.get()?.some((e) => { return e._id.toString() == id; })) {
                return Promise.reject(new Error(phrase.CANT_FIND_ANYMORE.randomOne()));
            }
        }
    }



}