class FormControl {

    constructor(url, data = {}) {
        this.setUrl(url).setData(data);
        this.actions = [];
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setData(data, spreadForActions = true) {
        this.data = data

        if (spreadForActions) this.actions?.forEach(a => { a.putData(data) });

        return this;
    }

    bind(holderSelector, placeHolderSelector) {
        this.holder = $(holderSelector);
        this.placeholder = $(placeHolderSelector);
        return this;
    }

    addAction(name, url, onSuccess, onFail) {
        const action = new RequestButton(name, url, onSuccess, onFail);
        this.actions.push(action)

        const self = this;

        action.end = () => { return self };
        action.addAction = (...p) => { return self.addAction(...p) };
        action.show = (...p) => { return self.show(...p) };

        return action;
    }

    hide() {
        this.holder.hide()
        this.placeholder.hide();
    }

    show(show = false) {
        if (show) {
            this.holder.hide().fadeIn()
        } else {
            this.holder.hide()
        }

        this.placeholder.toggle(!show);

        return this;
    }

    load(onLoaded) {
        const query = Object.keys(this.data).reduce((c, e) => { return c + e + '=' + this.data[e] + '&' }, '');

        this.holder.load(this.url + "?" + query, () => {
            this.show(true);
            //Bind all actions ids
            this.actions.forEach(a => a.bindClick(() => {
                //this.show(false)
            }));

            if (onLoaded) onLoaded(this.data)
        });

        return this;
    }

}


