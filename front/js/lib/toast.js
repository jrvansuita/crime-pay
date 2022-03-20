$(document).ready(() => {
    window.toast = new Toast();
})

class Toast {
    constructor() {
        this.group = $('<div>').attr('class', 'position-fixed top-0 end-0 p-3').css('z-index', '11');
        $('body').append(this.group);
    }

    build(msg) {
        var holder = $('<div>').attr('class', 'toast align-items-center').attr('role', 'alert').attr('aria-live', 'assertive').attr('aria-atomic', 'true')

        var div = $('<div>').addClass('d-flex');
        var label = $('<div>').addClass('toast-body').text(msg);
        var close = $('<button>').attr('type', 'button').attr('class', 'btn-close me-2 m-auto').attr('data-bs-dismiss', 'toast').attr('aria-label', 'close');

        holder.append(div.append(label, close));

        return { holder, label, close };
    }

    append(_item) {
        this.group.append(_item)
        new bootstrap.Toast(_item).show();
    }

    pop(msg, success) {
        return success ? this.success(msg) : this.error(msg);
    }

    error(msg) {
        this.show(msg, 'danger');
    }

    warning(msg) {
        this.show(msg, 'warning');
    }

    success(msg) {
        this.show(msg, 'success');
    }

    show(msg, color) {
        var item = this.build(msg);
        if (color) {
            item.holder.addClass('text-white bg-' + color);
            item.close.addClass('btn-close-white');
        }
        this.append(item.holder);
    }
}
