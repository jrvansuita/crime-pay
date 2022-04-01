const HookerController = require("../../controller/hooker");
const Script = require("./scripts");

module.exports = class HookerScripts extends Script {

    constructor() {
        super(new HookerController());
    }

    create(name, coinsFactor, rarity, stamina, intoxication) {
        super.create({ name, coinsFactor, rarity, stamina, intoxication });
    }

    createAll() {
        this.removeAll();

        this.create('Own Hand', 0, 50, 1, 0);
        this.create('Chicken', 0, 60, 2, 1);
        this.create('Ghost', 0, 90, 5, 15);
        this.create('Security Guy', 0, 85, 40, 1);
        this.create('Queer Old Guy', 0.1, 60, 7, 5);
        this.create('Red Hat', 0.1, 72, 32, 3);
        this.create('Neighbor', 0.1, 55, 12, 2);
        this.create('Indian Girl', 0.1, 45, 31, 4);
        this.create('Undressed Drag', 0.5, 65, 12, 10);
        this.create('Suicide Girl', 1, 65, 25, 20);
        this.create('Stoned Hooker', 1, 5, 10, 10);
        this.create('Dyke', 1, 18, 3, 1);
        this.create('Lesbian', 1, 56, 13, 6);
        this.create('Weed Head', 1.1, 16, 15, 20);
        this.create('Menopause Woman', 1.5, 22, 9, 5);
        this.create('Weird Girl', 1.5, 60, 15, 9);
        this.create('Maid', 1.7, 15, 8, 4);
        this.create('AIDS Boy', 1.9, 85, 34, 18);
        this.create('Fagot', 1.9, 23, 6, 4);
        this.create('Milf', 2, 20, 5, 5);
        this.create('Granny', 2.5, 45, 16, 7);
        this.create('Jacket Brunette', 2.8, 42, 13, 3);
        this.create('Old Asian', 3.3, 49, 18, 6);
        this.create('Black Power', 3.5, 35, 20, 10);
        this.create('Random Hooker', 3.5, 10, 10, 5);
        this.create('College Girl', 4, 25, 15, 3);
        this.create('Penelope', 4.1, 45, 25, 7);
        this.create('Anime Fetish', 4.1, 39, 24, 6);
        this.create('Gifted Lady', 4.2, 55, 35, 9);
        this.create('The Blonde', 4.3, 28, 20, 6);
        this.create('Tanned Girl', 4.7, 25, 22, 6);
        this.create('Feminist', 4.7, 20, 9, 6);
        this.create('Bunny Chick', 4.9, 39, 19, 4);
        this.create('Color Hair Bitch', 4.9, 28, 23, 5);
        this.create('Cat Girl', 4.9, 40, 32, 9);
        this.create('Tomboy Bitch', 5.2, 28, 20, 7);
        this.create('Hot Pussy', 5.3, 39, 30, 10);
        this.create('Flight Attendant', 5.7, 31, 28, 4);
        this.create('Well-Groomed Bitch', 5.8, 35, 26, 11);
        this.create('Nerd', 6.3, 35, 19, 5);
        this.create('MMA Fighter', 6.3, 95, 60, 2);
        this.create('Nurse Girl', 6.9, 41, 44, 0);
        this.create('Porn Star', 7.1, 39, 45, 18);
        this.create('Preppy Girl', 7.9, 65, 35, 3);
        this.create('Beverly Hills Chick', 8.1, 80, 44, 15);
        this.create('Socialite', 8.9, 55, 20, 2);
        this.create('Club Owner', 9, 95, 100, 3);
        this.create('Boxer', 9.1, 70, 30, 2);
        this.create('21 Years Old', 9.5, 35, 39, 5);

        this.execute();
    }


}


