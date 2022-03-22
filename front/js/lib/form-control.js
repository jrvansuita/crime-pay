class FormControl {

    setRequestData(data) {
        this.requestData = data
        return this;
    }

    setFormUrl(url) {
        this.formUrl = url;
        return this;
    }

    setResultUrl(url) {
        this.resultUrl = url;
        return this;
    }

    setFormHoldersSelectors(formHolderSelector, formPlaceHolderSelector) {
        this.holder = $(formHolderSelector);
        this.formPlaceholder = $(formPlaceHolderSelector);
        return this;
    }

    showPlaceholder() {
        this.formPlaceholder.show();
        this.holder.hide();

        return this;
    }

    onAfterLoad() {
        this.holder.hide().fadeIn();
        this.holder.data('key', this.key);
        this.formPlaceholder.hide();

    }

    toggleLoadingButton(show) {
        $(this.submitSelector).prop('disabled', show);
        $(this.submitSelector + ' .no-display').css('display', show ? 'inline-block' : 'none');
        $(this.submitSelector + ' .button-text').toggle(!show);
    }

    setSubmitOptions(options) {
        return this
            .setSubmitSelector(options.submit)
            .setOnSuccess(options.success)
            .setOnFailed(options.fail)
    }

    setSubmitSelector(selector) {
        this.submitSelector = selector;
        return this;
    }

    addSubmitItem(buttonId, path = '', extraData = {}) {
        $(buttonId).unbind().click(this.onSubmit(path, extraData));
    }

    setOnSuccess(onSuccess) {
        this.onSuccess = onSuccess;
        return this;
    }

    setOnFailed(onFailed) {
        this.onFailed = onFailed;
        return this;
    }

    onSubmit(path = '', extraData = {}) {
        return (event) => {
            event.stopPropagation();
            event.stopImmediatePropagation();

            this.toggleLoadingButton(true);

            var data = { ...extraData, ...this.requestData };

            $.post(path || this.resultUrl, data).done((data) => {
                this.toggleLoadingButton(false);
                this.showPlaceholder()
                if (this.onSuccess) this.onSuccess(data);

            }).fail((r) => {
                this.toggleLoadingButton(false);
                window.toast.error(r.responseText)

                if (this.onFailed) this.onFailed(r);
            });

        }
    }


    load(onLoaded) {
        var query = Object.keys(this.requestData).reduce((c, e) => { return c + e + '=' + this.requestData[e] + '&' }, '');

        this.holder.load(this.formUrl + "?" + query, () => {
            this.onAfterLoad();
            $(this.submitSelector).unbind().click(this.onSubmit());

            if (onLoaded) onLoaded(this.requestData)
        });

        return this;
    }



}