module.exports = class MiddleRules {

    constructor(app) {
        this.app = app;
    }

    begin() {
        this.app.get('/', (req, res) => {
            res.redirect('/robbery');
        });


        this.bindDevRoutes();
        this.bindSessionRules();
    }

    bindDevRoutes() {
        this.app.use('/dev/*', (req, res, next) => {
            if (process.env.NODE_ENV) {
                notFoundPageRedirect(req, res);
            }

            next();
        });
    }

    bindSessionRules() {
        //Making session visible in all ejs files
        this.app.use(function (req, res, next) {
            //Remove this line when login screen finished
            req.session.playerId = process.env.USER_ID
            res.locals.session = req.session;
            next();
        });
    }

    end() {
        this.bindNotFoundRoute();
    }


    bindNotFoundRoute() {
        this.app.use((req, res) => {
            notFoundPageRedirect(req, res);
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
