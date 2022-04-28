module.exports = class RouteRules {

    constructor(app) {
        this.app = app;
        this.rules = new Rules(app);
    }

    begin() {
        this.rules.voidRoutes();
        this.rules.devRoutes();
        this.rules.checkLogin();
        this.rules.lifeImprisonment();
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

    checkLogin() {
        //Making session visible in all ejs files
        this.app.use(function (req, res, next) {

            //console.log(req.url + ' - ' + req.session.playerId + ' : ' + (!req.url.includes('login') && !req.session.playerId));

            if (!req.url.includes('login') && !req.session.playerId)
                return res.redirect('/login')

            return next()
        });
    }

    lifeImprisonment() {
        const exceptionalPaths = ['prison', 'settings', 'inventory', 'historic'];

        //If player got life imprisonment, It can't access any page other than prison page
        this.app.use(function (req, res, next) {

            if (req.session?.player?.isLifeImprisoned?.() && !req.url.containsAnyOf(exceptionalPaths))
                return res.redirect('/prison')

            return next()
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
