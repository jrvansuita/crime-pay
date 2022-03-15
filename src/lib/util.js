const Num = {

    greaterFrom: (max, dec) => {
        return (max - Math.abs(dec)) < 0 ? max : dec;
    },

    lucky: (max, min = 1) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },


}


const Util = {
    //Clear empty and zero attributes
    clearProps: (obj) => {
        Object.keys(obj).forEach(key => {
            if (!obj[key]) delete obj[key]
        })
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

}


if (typeof module !== 'undefined') {
    module.exports = { Util, Num, Protos };
} else {
    Protos();
}

