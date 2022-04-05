class Keep {
    constructor(tag) {
        this.setTag(tag);
    }

    setTag(tag) {
        this.tag = tag?.trim();
        return this;
    }

    set(value, tag = this.tag) {
        sessionStorage.setItem(tag, value);
        return this;
    }

    get(tag = this.tag) {
        return sessionStorage.getItem(tag);
    }

    has(tag = this.tag) {
        return !!sessionStorage.getItem(tag);
    }


}