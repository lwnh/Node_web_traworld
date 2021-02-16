const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

const config = require('../config/key');
const googleEmail = config.googleEmail;
const googlePassword = config.googlePassword;

const { get } = require('../database/database');
const userModel = require('../database/model');

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
})

router.post('/login', function (req, res) {
    const database = get();
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    if (database) {
        userModel.find({ userid })
            .then(result => {
                bcrypt.compare(userpw, result[0].userpw, function (err, compareResult) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (compareResult) {
                        console.log(result)
                        if (req.session.user) {
                            console.log('already session created')
                        } else {
                            req.session.user = {
                                name: result[0].name,
                                userid,
                                createTime: new Date(),
                            }
                        }
                        res.json({ success: 200, msg: "success", userid });
                    } else {
                        res.json({ success: 201, msg: "fail" });
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.json({ success: 202, msg: "fail" }); //user undefined
            })
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/signup', function (req, res) {
    const database = get();
    const saltRounds = 10;

    const name = req.body.name.value;
    const userid = req.body.userid.value;
    const userpw = req.body.userpw.value;
    const email = req.body.email.value;

    if (database) {
        bcrypt
            .hash(userpw, saltRounds)
            .then(hash => {
                const user = new userModel({ name, userid, userpw: hash, email });
                user.save()
                    .then(result => {
                        console.log(result)
                        res.json({ success: 200, msg: "success" });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({ success: 201, msg: "fail" });
                    })
            })
            .catch(err => {
                console.log(err)
                res.json({ success: 201, msg: "fail" });
            });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/update', function (req, res) {
    const database = get();
    const saltRounds = 10;

    const name = req.body.name.value;
    const userid = req.body.userid.value;
    const userpw = req.body.userpw.value;
    const email = req.body.email.value;

    if (database) {
        bcrypt
            .hash(userpw, saltRounds)
            .then(hash => {
                userModel.findOneAndUpdate({ userid }, { name, userpw: hash, email })
                    .then(result => {
                        res.json({ success: 200, msg: "success" });
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({ success: 201, msg: "fail" });
                    })
            })
            .catch(err => {
                console.log(err)
                res.json({ success: 201, msg: "fail" });
            });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

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
                res.json({ success: 200, msg: "success" });
            })
            .catch(err => {
                console.log(err)
                res.json({ success: 201, msg: "fail" });
            })
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/userinfo', function (req, res) {
    const database = get();
    const userid = req.body.userid;

    if (database) {
        userModel.find({ userid })
            .then(result => {
                res.json({ success: 200, msg: "success", result });
            })
            .catch(err => {
                console.log(err);
                res.json({ success: 201, msg: "fail" });
            })
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('destroy session')
            res.end()
        }
    })
})

module.exports = router;