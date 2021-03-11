const LocalStrategy = require('passport-local').Strategy;
const { get } = require('../../database/database');
const Users = require('../../database/model');

module.exports = new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'userpw',
    session: true,
    passReqToCallback: false,
}, (userid, userpw, done) => {
    const database = get();

    if (database) {
        Users.findOne({ userid }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { success: 202, message: '등록되지 않은 아이디입니다. 회원가입을 해주세요.' });
            }
            user.checkPassword(userpw, function (err, isMatch) {
                if (err) { return done(err); }
                if (!isMatch) {
                    return done(null, false, { success: 201, message: '비밀번호를 확인해주세요.' });
                }
                return done(null, user, { success: 200, message: "success", user: user.name });
            })
        });
    }
});