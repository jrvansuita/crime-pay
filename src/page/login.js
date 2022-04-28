const phrase = require("../const/phrase");
const PlayerMinter = require("../minter/player");
const Page = require("./page");

module.exports = class LoginPage extends Page {

    routes() {
        this.page('/login', false).then(({ res, req }) => {
            this.sessionClear(req)
            res.render('pages/login')
        });

        this.post('/login', false).then(({ req, res }) => {
            console.log(req.body);

            const wallet = req.body?.wallet;
            const name = req.body?.name;

            (!wallet).throw(phrase.NOT_WALLET_ADDRESS);
            (!name).throw(phrase.PLAYER_NAME_NOT_INFORMED);

            return this.playerData.find({ wallet: wallet }, true)
                .then((player) => {
                    if (!player) {
                        const newPlayer = new PlayerMinter().newOne(name, wallet).mint();
                        return this.playerData.save(newPlayer);
                    }

                    return player;
                })
                .then((player) => {
                    this.applySession({ req, player });
                    res.send(player);
                }).catch((e) => {
                    res.status(500).send(e.message)
                })
        });

    }
}
