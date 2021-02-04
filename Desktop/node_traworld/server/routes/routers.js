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
                res.json({ success: 100, msg: "server error"});
            }
            if (result) {
                console.dir(result);
                res.json({ success: 200, msg: "success", userid});
            } else {
                res.json({ success: 201, msg: "fail"});
            }
        });
    } else {
        res.json({ success: 300, msg: "database error"});
    }
})

router.post('/signup', function (req, res) {
    console.log('signup');
    const database = get();

    const name = req.body.name;
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const email = req.body.email;

    console.log(`signup : name:${name}, userid:${userid}, userpw:${userpw}, email:${email}`);
    if (database) {
        userRegister(database, name, userid, userpw, email, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ success: 100, msg: "server error"});
            }
            if (result.insertedCount > 0) {
                res.json({ success: 200, msg: "success"});
            } else {
                res.json({ success: 201, msg: "fail"});
            }
        });
    } else {
        res.json({ success: 300, msg: "database error"});
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

    members.insertOne([{ name, userid, userpw, email }], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        if (result.insertedCount > 0) {
            console.log(`사용자 document ${result.insertedCount} 추가`);
        } else {
            console.log(`사용자 document 추가되지 않음`);
        }
        callback(null, result);
    });
}

module.exports = router;