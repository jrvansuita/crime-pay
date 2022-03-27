const Page = require("./page");
const InventoryMecanics = require("../mecanics/inventory");

module.exports = class InventoryPage extends Page {

    constructor(app) {
        super(app)
        this.inventoryMecanics = new InventoryMecanics();
    }

    routes() {
        this.page('/inventory').then(({ res, player }) => { res.render('pages/inventory', { player }) });

    }
}