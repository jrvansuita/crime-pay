module.exports = class Context {
    constructor(dir) {
        this.dir = dir;
    }

    initialize() {
        this.bindEnv();
        this.bindJobs();
        this.startExpress();
        this.bindBodyParser();

        this.bindCompression();
        this.bindLocalLibs();
        this.bindMinify();
        this.exposeStaticFiles();

        this.bindSession().bindSessionMidleware();
        this.defineRoutes();



        this.startListening();
    }

    bindEnv() {
        require('dotenv').config();
    }


    bindJobs() {
        require('../schedule/jobs');
    }

    startExpress() {
        this.express = require('express');
        this.app = this.express();
    }

    bindBodyParser() {
        const bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    bindCompression() {
        const compression = require('compression');
        this.app.use(compression({
            level: 6,
            threshold: 0
        }));
    }

    bindMinify() {
        if (process.env.NODE_ENV) {
            const minify = require('express-minify');
            this.app.use(minify({
                cache: this.dir + '/cache',
            }));
        }
    }

    bindLocalLibs() {
        this.app.locals.moment = require('moment');
    }


    exposeStaticFiles() {
        this.app.use('/img', this.express.static('front/img'));
        this.app.use('/css', this.express.static('front/css'));
        this.app.use('/js', this.express.static('front/js'));
        this.app.use('/pages', this.express.static('front/js'));

        var path = require('path')
        this.app.set('views', path.join(this.dir, '/front/views'))
        this.app.set('view engine', 'ejs');
    }

    bindSession() {
        const cookieSession = require('cookie-session');

        const tenDays = 1000 * 60 * 60 * 24 * 10;

        this.app.use(cookieSession({
            name: 'crime-pay',
            secret: process.env.SESS,
            maxAge: tenDays
        }));

        return this;
    }

    bindSessionMidleware() {
        //Making session visible in all ejs files
        this.app.use(function (req, res, next) {
            //Remove this line when login screen finished
            req.session.playerId = process.env.USER_ID
            res.locals.session = req.session;
            next();
        });
    }

    defineRoutes() {
        (require('../routes/routes')).bind(this.app);
    }

    startListening() {
        this.app.listen(process.env.PORT || 3000);
    }




}