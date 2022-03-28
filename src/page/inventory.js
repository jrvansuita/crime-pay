const Page = require("./page");
const InventoryMecanics = require("../mecanics/inventory");
const WeaponController = require("../controller/weapon");

module.exports = class InventoryPage extends Page {

    constructor(app) {
        super(app)
        this.inventoryMecanics = new InventoryMecanics();
        this.weaponController = new WeaponController();
    }

    routes() {
        this.page('/inventory').then(({ res, player }) => { res.render('pages/inventory', { player }) });

        this.get('/inventory-weapons').then(({ player, res }) => {
            return this.weaponController.for(player).then((weapons) => res.render('partials/inventory-weapons', { weapons }));
        });

        this.get('/inventory-form').then(({ player, req, res }) => {
            return this.weaponController.details(req.query.id, player).then(weapon => {
                res.render('partials/inventory-form', { weapon, player })
            });
        });





    }
}