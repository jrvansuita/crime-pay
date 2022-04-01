class RequestButton {
    constructor(id, url, onSuccess, onFail) {
        this.setId(id)
            .setUrl(url)
            .setOnSuccess(onSuccess)
            .setOnFail(onFail)
            .delayed()

    }

    setId(id, loadingButton = true) {
        this.id = id;
        this.isLoadingButton = loadingButton;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    delayed(delay = 400) {
        this.delay = delay;
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

    setOnAlways(onAlways) {
        this.onAlways = onAlways;

        return this;
    }

    showErrorOnFail() {
        this.showError = true;

        return this;
    }

    loading(show) {
        if (this.isLoadingButton) {
            const dropdownMenu = $(this.id).parents('.dropdown-menu');
            const button = dropdownMenu.length ? dropdownMenu.siblings('.btn').first() : $(this.id);

            button.prop('disabled', show);
            button.find('.no-display').css('display', show ? 'inline-block' : 'none');
            button.find('.button-text').toggle(!show);
        }
    }

    makeRequest() {
        $.post(this.url, this.data)
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

    onBindRequest(onClicked, action) {
        return (event) => {

            if (onClicked) onClicked(action);

            event.stopPropagation();
            event.stopImmediatePropagation();

            this.loading(true);

            setTimeout(() => {
                this.makeRequest()
            }, this.delay || 0)
        }
    }

    bindClick(onClicked) {
        $(this.id).unbind().click(this.onBindRequest(onClicked, this));

        return this;
    }

}