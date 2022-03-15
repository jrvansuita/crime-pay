module.exports = class Context {
    constructor(dir) {
        this.dir = dir;
    }

    initialize() {
        this.bindEnv();
        this.bindJobs();
        this.startExpress();
        this.bindBodyParser();
        this.defineFavIcon();
        this.bindCompression();
        this.bindLocalLibs();
        this.bindMinify();
        this.exposeStaticFiles();

        this.bindSession().bindSessionMidleware();
        this.defineRoutes();
        this.definePrototypes();

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

    defineFavIcon() {
        const favicon = require('serve-favicon');
        this.app.use(favicon(this.dir + '/front/img/favicon.ico'));
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

    getCacheTime() {
        //Ten Days
        return 1000 * 60 * 60 * 24 * 10;
    }


    exposeStaticFiles() {
        const applyUse = (path, folder) => {
            this.app.use(path, this.express.static(folder, { maxAge: this.getCacheTime() }));
        }

        applyUse('/img', 'front/img');
        applyUse('/css', 'front/css');
        applyUse('/js', 'front/js');


        this.app.set('views', this.dir + '/front/views')
        this.app.set('view engine', 'ejs');
    }


    bindSession() {
        const cookieSession = require('cookie-session');

        this.app.use(cookieSession({
            name: 'crime-pay',
            secret: process.env.SESS,
            maxAge: this.getCacheTime()
        }));

        return this;
    }

    bindSessionMidleware() {
        //Making session visible in all ejs files
        this.app.use(function(req, res, next) {
            //Remove this line when login screen finished
            req.session.playerId = process.env.USER_ID
            res.locals.session = req.session;
            next();
        });
    }

    definePrototypes() {
        require('../lib/util').Protos();
    }

    defineRoutes() {
        (require('../routes/routes')).bind(this.app);
    }

    getPort() {
        return process.env.PORT || 3000;
    }

    startListening() {
        this.app.set('port', this.getPort());
        this.app.listen().setTimeout(120000); // 2 min

        this.app.listen(this.getPort(), () => {
            // console.log('Node is running on port ', this.getPort())
        });
    }




}