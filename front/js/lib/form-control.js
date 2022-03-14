class FormControl {


    setKey(key) {
        this.key = key
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
        $(this.submitSelector + ' .no-display').css('display', show ? 'inherit' : 'none');
        $(this.submitSelector + ' .button-text').toggle(!show);
    }


    setSubmitOptions(options) {
        return this.setSubmitSelector(options.submit)
            .setOnBuildSubmitPayload(options.payload)
            .setOnSuccess(options.success)
            .setOnFailed(options.fail)
    }

    setSubmitSelector(selector) {
        this.submitSelector = selector;
        return this;
    }
    setOnBuildSubmitPayload(onBuildSubmitPayload) {
        this.onBuildSubmitPayload = onBuildSubmitPayload;
        return this;
    }

    setOnSuccess(onSuccess) {
        this.onSuccess = onSuccess;
        return this;
    }

    setOnFailed(onFailed) {
        this.onFailed = onFailed;
        return this;
    }

    onSubmit() {
        return () => {
            this.toggleLoadingButton(true);

            setTimeout(() => {
                var data = this.onBuildSubmitPayload(this.key);

                $.post(this.resultUrl, data).done((data) => {
                    this.toggleLoadingButton(false);
                    this.showPlaceholder()
                    if (this.onSuccess) this.onSuccess(data);

                }).fail((r) => {
                    this.toggleLoadingButton(false);
                    window.toast.error(r.responseText)

                    if (this.onFailed) this.onFailed(r);
                });
            }, 400);
        }
    }


    load() {
        setTimeout(() => {
            this.holder.load(this.formUrl + "?_id=" + this.key, () => {
                this.onAfterLoad();
                $(this.submitSelector).click(this.onSubmit());
            });
        }, 0);

        return this;
    }



}