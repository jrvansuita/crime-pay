import { Button } from "./buttons.js";


export class RequestButton extends Button {

    constructor(id, url, onSuccess, onFail) {
        super(id).setUrl(url)
            .setOnSuccess(onSuccess)
            .setOnFail(onFail)
            .setOnClick(this.request)
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    putData(data = {}) {
        this.data = { ...(this?.data || {}), ...data }
        return this;
    }

    onData(onDataListener) {
        this.onDataListener = onDataListener;
        return this;
    }

    setOnSuccess(onSuccess) {
        this.onSuccess = onSuccess;
        return this;
    }

    setOnFail(onFail) {
        this.onFail = onFail;

        if (!onFail) this.showErrorOnFail();

        return this;
    }

    setOnAlways(onAlways) {
        this.onAlways = onAlways;

        return this;
    }

    showErrorOnFail() {
        this.showError = true;

        return this;
    }

    request() {
        const data = { ...this.data, ...(this?.onDataListener?.(this) || {}) };

        const settings = {
            url: this.url,
            contentType: "application/json",
            data: JSON.stringify(data),
        }

        $.post(settings)
            .done(this.onSuccess)
            .fail((error) => {
                if (this.showError) window.toast.error(error.responseText);
                if (this.onFail) this.onFail(error);
            })
            .always((data) => {
                this.loading(false);
                if (this.onAlways) this.onAlways(data);
            });
    }



}