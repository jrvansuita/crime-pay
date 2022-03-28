class RequestButton {
    constructor(id, url, onSuccess, onFail) {
        this.setId(id)
            .setUrl(url)
            .setOnSuccess(onSuccess)
            .setOnFail(onFail);
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    putData(data = {}) {
        this.data = { ...(this?.data || {}), ...data }
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

    showErrorOnFail() {
        this.showError = true;

        return this;
    }

    loading(show) {
        $(this.id).prop('disabled', show);
        $(this.id + ' .no-display').css('display', show ? 'inline-block' : 'none');
        $(this.id + ' .button-text').toggle(!show);
    }

    onBindRequest(onClicked, action) {
        return (event) => {

            if (onClicked) onClicked(action);

            event.stopPropagation();
            event.stopImmediatePropagation();

            this.loading(true);

            $.post(this.url, this.data)
                .done(this.onSuccess)
                .fail((error) => {
                    if (this.showError) window.toast.error(error.responseText);
                    if (this.onFail) this.onFail(error);
                })
                .always(() => {
                    this.loading(false);
                });
        }
    }

    bindClick(onClicked) {
        $(this.id).unbind().click(this.onBindRequest(onClicked, this));
    }

}