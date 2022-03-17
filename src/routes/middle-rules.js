
module.exports = class MiddleRules {

    bind(app) {

        //Making session visible in all ejs files
        app.use(function (req, res, next) {
            //Remove this line when login screen finished
            req.session.playerId = process.env.USER_ID
            res.locals.session = req.session;
            next();
        });


        app.use(function (req, res, next) {



            next();
        });
    }
}