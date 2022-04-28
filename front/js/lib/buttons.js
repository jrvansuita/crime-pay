
export class Button {
    constructor(id, onClick) {
        this.setId(id)
            .setOnClick(onClick)
            .delayed()
            .bind()
    }

    setId(id, loadingButton = true) {
        this.id = id;
        this.isLoadingButton = loadingButton;
        return this;
    }

    delayed(delay = 300) {
        this.delay = delay;
        return this;
    }

    onValidate(validateListener) {
        this.validateListener = validateListener;
        return this;
    }

    setOnClick(onClickListener) {
        this.onClickListener = onClickListener;
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

    onClick() {
        const self = this;

        return (event) => {

            if (!this.validateListener || this.validateListener(self)) {
                event.stopPropagation();
                event.stopImmediatePropagation();

                this.loading(true);

                Util.sleep(this.delay).then(() => {
                    if (this.onClickListener) this.onClickListener(self)
                })
            }
        }
    }

    bind() {
        $(this.id).unbind().click(this.onClick());

        return this;
    }

}