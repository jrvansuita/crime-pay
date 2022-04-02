const Page = require("./page");
const InventoryMechanics = require("../mechanics/inventory");
const InventoryController = require("../controller/inventory");

module.exports = class InventoryPage extends Page {

    constructor(app) {
        super(app)
        this.inventoryMechanics = new InventoryMechanics();
        this.inventoryController = new InventoryController();
    }

    routes() {
        this.page('/inventory').then(({ res, player }) => { res.render('pages/inventory', { player }) });

        this.get('/inventory-weapons').then(({ player, res }) => {
            return this.inventoryController.for(player).then((weapons) => res.render('partials/inventory-weapons', { player, weapons }));
        });

        this.get('/inventory-form').then(({ player, req, res }) => {
            return this.inventoryController.details(req.query.id, player).then(weapon => {
                res.render('partials/inventory-form', { weapon, player })
            });
        });

        this.post('/inventory-equip').then(({ player, req, res }) => {
            return this.inventoryMechanics.equip(player, req.body.id).then(result => res.send(result));
        });

        this.post('/inventory-burn').then(({ player, req, res }) => {
            return this.inventoryMechanics.burn(player, req.body.id).then(result => res.send(result));
        });

        this.post('/inventory-sell').then(({ player, req, res }) => {
            return this.inventoryMechanics.sell(player, req.body.id, req.body.price).then(result => res.send(result));
        });

    }
}