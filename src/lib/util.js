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
        if (trunc) value = Math.trunc(value)
        if (min !== undefined) value = Math.max(min, value)
        if (max !== undefined) value = Math.min(max, value)

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
        return value && moment ? concatString + moment(value).calendar() : defaultString;
    }
}




const Protos = () => {

    String.prototype.replaceAll = function (search, replacement) {
        return this.replace(new RegExp(search, 'g'), replacement)
    }

    Array.prototype.randomOne = function () {
        return this[Math.floor(Math.random() * this.length)];
    }

    Number.prototype.format = function () {
        return new Intl.NumberFormat().format(this);
    }

    Number.prototype.between = function (a, b) {
        var min = Math.min.apply(Math, [a, b]),
            max = Math.max.apply(Math, [a, b]);
        return this > min && this < max;
    };

    String.prototype.toDateDisplay = function (...params) {
        return Util.dateFormat(this, ...params)
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

