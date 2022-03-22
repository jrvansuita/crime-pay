module.exports = class Script {


    constructor(controller) {
        this.conttroller = controller;
        this.stack = [];
    }

    create(data) {
        this.stack.push(this.conttroller.save(data).then((data) => {
            console.log(data);
        }));
    }

    set(query, data) {
        this.stack.push(this.conttroller.updateAll(query, { $set: data }).then((data) => {
            console.log(data);
        }));
    }

    inc(query, data) {
        this.stack.push(this.conttroller.updateAll(query, { $inc: data }).then((data) => {
            console.log(data);
        }));
    }

    remove(query = {}) {
        this.stack.push(this.conttroller.remove(query).then((data) => {
            console.log('Removed ' + (data?.n || 0) + ' Objects.');
        }));
    }

    removeAll() {
        this.remove();
    }


    execute() {
        if (this.stack.length) {
            return Promise.all(this.stack).then(() => {
                console.log('Script Finished');
            })
        }
    }

}