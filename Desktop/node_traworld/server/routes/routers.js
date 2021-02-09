const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

const config = require('../config/key');
const googleEmail = config.googleEmail;
const googlePassword = config.googlePassword;

const { get } = require('../database/database');

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
        userLogin(database, userid, userpw, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result) {
                console.dir(result);
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
        });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/signup', function (req, res) {
    const database = get();

    const name = req.body.name.value;
    const userid = req.body.userid.value;
    const userpw = req.body.userpw.value;
    const email = req.body.email.value;

    if (database) {
        userRegister(database, name, userid, userpw, email, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result.insertedCount > 0) {
                res.json({ success: 200, msg: "success" });
            } else {
                res.json({ success: 201, msg: "fail" });
            }
        });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/update', function (req, res) {
    const database = get();

    const name = req.body.name.value;
    const userid = req.body.userid.value;
    const userpw = req.body.userpw.value;
    const email = req.body.email.value;

    if (database) {
        userUpdate(database, name, userid, userpw, email, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result.modifiedCount > 0) {
                res.json({ success: 200, msg: "success" });
            } else {
                res.json({ success: 201, msg: "fail" });
            }
        });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/delete', function (req, res) {
    const database = get();
    const userid = req.body.userid.value;

    if (database) {
        userDelete(database, userid, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result.deletedCount > 0) {
                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('destroy session')
                        res.end()
                    }
                })
                res.json({ success: 200, msg: "success" });
            } else {
                res.json({ success: 201, msg: "fail" });
            }
        });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

router.post('/userinfo', function (req, res) {
    const database = get();
    const userid = req.body.userid;

    if (database) {
        userSelect(database, userid, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result) {
                console.dir(result);
                res.json({ success: 200, msg: "success", result });
            } else {
                res.json({ success: 201, msg: "fail" });
            }
        });
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

const userLogin = function (database, userid, userpw, callback) {
    userSelect(database, userid, (err, result) => {
        if (err) console.log(err);
        if (result) {
            bcrypt.compare(userpw, result[0].userpw, function (err, res) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                }
                res ? callback(null, result) : callback(null, null);
            });
        } else {
            callback(null, null);
        }
    });
}

const userRegister = function (database, name, userid, userpw, email, callback) {
    const members = database.collection('member');
    const saltRounds = 10;

    bcrypt
        .hash(userpw, saltRounds)
        .then(hash => {
            members.insertMany([{ name, userid, userpw: hash, email }], (err, result) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        })
        .catch(err => console.log(err));
}

const userUpdate = function (database, name, userid, userpw, email, callback) {
    const members = database.collection('member');
    const saltRounds = 10;

    bcrypt
        .hash(userpw, saltRounds)
        .then(hash => {
            members.updateOne({ userid }, { $set: { name, userpw: hash, email } }, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        })
        .catch(err => console.log(err));
}

const userDelete = function (database, userid, callback) {
    const members = database.collection('member');

    members.deleteOne({ userid }, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const userSelect = function (database, userid, callback) {
    const members = database.collection('member');

    members.find({ userid }).toArray((err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        if (result.length > 0) {
            callback(null, result);
        } else {
            callback(null, null);
        }
    })
}

module.exports = router;