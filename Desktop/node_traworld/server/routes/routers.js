const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const config = require('../config/key');
const googleEmail = config.googleEmail;
const googlePassword = config.googlePassword;

const { get } = require('../database/database');

router.post('/contact', function (req, res) {
    console.log(req.body);

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

    console.log(`login - userid:${userid}, userpw:${userpw}`);

    if (database) {
        userLogin(database, userid, userpw, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result) {
                console.dir(result);
                if(req.session.user) {
                    console.log('already session created')
                } else {
                    req.session.user = {
                        name: result[0].name,
                        userid,
                        createTime : new Date(),
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

    console.log(`signup : name:${name}, userid:${userid}, userpw:${userpw}, email:${email}`);
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

router.post('/logout', function (req, res) {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('destroy session')
            res.end()
        }
    })
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

router.post('/update', function (req, res) {
    const database = get();

    const name = req.body.name.value;
    const userid = req.body.userid.value;
    const userpw = req.body.userpw.value;
    const email = req.body.email.value;

    console.log(`update : name:${name}, userid:${userid}, userpw:${userpw}, email:${email}`);

    if (database) {
        userUpdate(database, name, userid, userpw, email, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error" });
            }
            if (result) {
                res.json({ success: 200, msg: "success" });
            } else {
                res.json({ success: 201, msg: "fail" });
            }
        });
    } else {
        res.json({ success: 300, msg: "database error" });
    }
})

const userLogin = function (database, userid, userpw, callback) {
    const members = database.collection('member');

    members.find({ userid, userpw }).toArray((err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        if (result.length > 0) {
            console.log('find user');
            callback(null, result);
        } else {
            console.log('cannot find user');
            callback(null, null);
        }
    })
}

const userRegister = function (database, name, userid, userpw, email, callback) {
    console.log('userRegister 호출');

    const members = database.collection('member');

    members.insertMany([{ name, userid, userpw, email }], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        if (result.insertedCount > 0) {
            console.log(`사용자 ${result.insertedCount}명 추가`);
        } else {
            console.log(`사용자 추가되지 않음`);
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
            console.log('find user info');
            callback(null, result);
        } else {
            console.log('cannot find user info');
            callback(null, null);
        }
    })
}

const userUpdate = function (database, name, userid, userpw, email, callback) {
    console.log('userUpdate 호출');

    const members = database.collection('member');

    members.updateOne({userid}, {$set:{ name, userpw, email }}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        if (result.modifiedCount > 0) {
            console.log(`사용자 ${result.modifiedCount}명 정보 수정`);
        } else {
            console.log(`사용자 정보 수정되지 않음`);
        }
        callback(null, result);
    });
}

module.exports = router;