const moment = typeof require !== 'undefined' ? require("moment") : window.moment;


const Num = {

    greaterFrom: (max, dec) => {
        return (max - Math.abs(dec)) < 0 ? max : dec;
    },

    lucky: (max, min = 1) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    assert(value, trunc, min, max) {
        if (min !== undefined) value = Math.max(min, value)
        if (max !== undefined) value = Math.min(max, value)

        if (trunc) value = Math.trunc(value)

        return value;
    }

}


const Util = {
    //Clear empty and zero attributes
    clearProps: (obj) => {
        Object.keys(obj).forEach(key => {
            if (!obj[key]) delete obj[key]
        })
    },

    dateFormat: (value, concatString = '', defaultString = '') => {
        return value && moment ? concatString + moment(new Date(value)).calendar() : defaultString;
    },

    hashCode: (str) => {
        if (str) {
            str = str.toString().toLowerCase().trim()
        }

        var hash = 0
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        return hash
    },

    strToColor: function (str, alpha) {
        var shortened = this.hashCode(str) % 160
        return 'hsl(' + shortened + ', 45%, 60%' + (alpha ? ', ' + alpha : '') + ')'
    },
}




const Protos = () => {

    String.prototype.image = function (folder = '', extension = 'jpg') {
        return "/img/" + folder + '/' + this.toLowerCase().trim().replaceAll(" ", "-") + '.' + extension;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    String.prototype.plus = function () {
        return '+' + this;
    }

    String.prototype.minus = function () {
        return '-' + this;
    }

    String.prototype.percent = function () {
        return this + '%';
    }

    String.prototype.replaceAll = function (search, replacement) {
        return this.replace(new RegExp(search, 'g'), replacement)
    }

    String.prototype.joinBefore = function (str, n = 0) {
        return str.toString().space(n) + this;
    }

    String.prototype.space = function (n = 1) {
        return this + ' '.repeat(n)
    }

    String.prototype.concat = function (str, n = 1, char = ' ') {
        return this.join(str, n, char);
    }

    String.prototype.join = function (str, n = 0, char = ' ') {
        return this + char.repeat(n) + str;
    }

    String.prototype.format = function () {
        return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
    };

    String.prototype.array = function () {
        return [this]
    }

    String.prototype.hash = function () {
        return this.toLowerCase().trim().split('').reduce((hash, char) => {
            return char.charCodeAt(0) + ((hash << 5) - hash)
        }, 0);
    }

    String.prototype.toColor = function (alpha = 1, saturation = 40, lightness = 60) {
        return 'hsl(' + this.hash() % 210 + ', ' + saturation + '%, ' + lightness + '%' + ', ' + alpha + ')'
    }

    Array.prototype.array = function () {
        return this;
    }

    Array.prototype.randomOne = function () {
        return this.random();
    }

    Array.prototype.deepCopy = function () {
        return JSON.parse(JSON.stringify(this));
    }

    Array.prototype.random = function (count = 1) {
        return this.sort(() => Math.random() - 0.5).slice(0, count)
    }

    Array.prototype.dual = function () {
        if (this.length == 2) {
            const min = this[0].sign();
            const max = Math.abs(this[1]);
            return (min !== max) ? min + '-' + max : min;
        }

        return '';
    }


    Number.prototype.positive = function () {
        return this > 0;
    }

    Number.prototype.negative = function () {
        return this < 0;
    }

    Number.prototype.greater = function (n) {
        return this > n;
    }

    Number.prototype.smaller = function (n) {
        return this < n;
    }

    Number.prototype.plus = function () {
        return '+' + this;
    }

    Number.prototype.minus = function () {
        return '-' + this;
    }

    Number.prototype.percent = function () {
        return this + '%';
    }

    Number.prototype.format = function (def = 0, pre = '', su = '') {
        return this != 0 && !!this ? pre + new Intl.NumberFormat().format(this) + su : def;
    }

    Number.prototype.sign = function () {
        return this > 0 ? this.format().plus() : this.format()
    }


    Number.prototype.abs = function () {
        return Math.abs(this);
    }

    Number.prototype.between = function (a, b) {
        var min = Math.min.apply(Math, [a, b]),
            max = Math.max.apply(Math, [a, b]);
        return this > min && this < max;
    };

    String.prototype.toDateDisplay = function (...params) {
        return Util.dateFormat(this, ...params)
    }

    String.prototype.containsAnyOf = function (arr, match) {
        return arr.some(each => { return match ? this == each.toString() : this.includes(each.toString()) });
    }

    Date.prototype.toDateDisplay = function (...params) {
        return Util.dateFormat(this, ...params)
    }


}


if (typeof module !== 'undefined') {
    module.exports = { Util, Num, Protos };
} else {
    Protos();
}

