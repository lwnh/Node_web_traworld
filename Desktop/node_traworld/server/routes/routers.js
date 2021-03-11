const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

const config = require('../config/key');
const googleEmail = config.googleEmail;
const googlePassword = config.googlePassword;

const { get } = require('../database/database');
const userModel = require('../database/model');

module.exports = (router, passport) => {
    router.post('/', function (req, res) {
        if (req.user) {
            res.json({ success: 200, message: "success", user: req.user.name });
        }
        res.end();
    });

    router.post('/contact', function (req, res) {
        const fromemail = req.body.email;
        const from = req.body.name;
        const toemail = googleEmail;
        const to = 'Master';
        const title = 'TRAWORLD로부터 받은 메일입니다.';
        const tel = req.body.tel;
        const message = `${req.body.message} \nfrom : ${from} (${fromemail}) \ntel : ${tel}`;

        const fromMsg = `${from}<${fromemail}>`;
        const toMsg = `${to}<${toemail}>`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: googleEmail,
                pass: googlePassword
            }
        });

        const mailOptions = {
            from: fromMsg,
            to: toMsg,
            subject: title,
            text: message,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            transporter.close();
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                res.end();
            }
        });
    });

    router.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json(info); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json(info);
            });
        })(req, res, next);
    });

    router.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) { return next(err); }
            res.json(info)
        })(req, res, next);
    });

    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    router.post('/update', function (req, res) {
        const database = get();
        const saltRounds = 10;

        const userid = req.body.userid.value;
        const userpw = req.body.userpw.value;
        const email = req.body.email.value;

        if (database) {
            bcrypt
                .hash(userpw, saltRounds)
                .then(hash => {
                    userModel.findOneAndUpdate({ userid }, { userpw: hash, email })
                        .then(result => {
                            res.json({ success: 200, message: "success" });
                        })
                        .catch(err => {
                            console.log(err)
                            res.json({ success: 201, message: "fail" });
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.json({ success: 201, message: "fail" });
                });
        } else {
            res.json({ success: 300, message: "database error" });
        }
    });

    router.post('/delete', function (req, res) {
        const database = get();
        const userid = req.body.userid.value;

        if (database) {
            userModel.findOneAndRemove({ userid })
                .then(result => {
                    req.session.destroy((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('destroy session')
                            res.end()
                        }
                    })
                    res.json({ success: 200, message: "success" });
                })
                .catch(err => {
                    console.log(err)
                    res.json({ success: 201, message: "fail" });
                })
        } else {
            res.json({ success: 300, message: "database error" });
        }
    });

    router.post('/userinfo', function (req, res) {
        const database = get();
        const userid = req.user.userid;

        if (database) {
            userModel.find({ userid })
                .then(result => {
                    res.json({ success: 200, message: "success", result });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ success: 201, message: "fail" });
                })
        } else {
            res.json({ success: 300, message: "database error" });
        }
    });

    router.post('/logout', function (req, res) {
        req.logout();
        req.session.save(function () {
            res.redirect('/');
        });
    });

    return router;
}