module.exports = class RouteRules {

    constructor(app) {
        this.app = app;
        this.rules = new Rules(app);
    }

    begin() {
        this.rules.voidRoutes();
        this.rules.devRoutes();
        this.rules.sessionMiddleware();
        this.rules.lifeImprisonmentPlayer();
    }

    end() {
        this.rules.pageNotFound();
    }
}



class Rules {

    constructor(app) {
        this.app = app;
    }

    pageNotFound() {
        this.app.use((req, res) => {
            notFoundPageRedirect(req, res);
        });
    }

    voidRoutes() {
        this.app.get('/', (req, res) => {
            res.redirect('/robbery');
        });
    }

    devRoutes() {
        this.app.use('/dev/*', (req, res, next) => {
            if (process.env.NODE_ENV) {
                notFoundPageRedirect(req, res);
            }

            next();
        });
    }

    sessionMiddleware() {
        //Making session visible in all ejs files
        this.app.use(function (req, res, next) {
            //Remove this line when login screen finished
            req.session.playerId = process.env.USER_ID
            res.locals.session = req.session;
            next();
        });
    }

    lifeImprisonmentPlayer() {
        const excepcionalPaths = ['prison', 'settings'];

        //If player got life imprisonment, It can't access any page other than prison page
        this.app.use(function (req, res, next) {

            const player = req.session.player;
            const lifeImprisonment = player && player?.arrested && !player?.arrestRelease;

            if (lifeImprisonment) {
                if (req.url.containsAnyOf(excepcionalPaths)) {
                    next();
                } else {
                    res.redirect('/prison')
                }
            } else {
                next()
            }
        });
    }



}


const notFoundPageRedirect = (req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.render('pages/404', { url: req.url });
        return;
    }
}
