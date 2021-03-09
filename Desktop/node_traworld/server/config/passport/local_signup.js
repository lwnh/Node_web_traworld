const LocalStrategy = require('passport-local').Strategy;
const { get } = require('../../database/database');
const Users = require('../../database/model');

module.exports = new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'userpw',
    passReqToCallback: true,
}, (req, userid, userpw, done) => {
    const name = req.body.name;
    const email = req.body.email;
    const database = get();

    if (database) {
        Users.findOne({ userid }, (err, user) => {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, { success: 201, message: '이미 가입된 계정입니다.' });
            }
            const newUser = new Users({ name, userid, userpw, email });
            newUser.save((err) => {
                if (err) { return done(err); }
                return done(null, user, { success: 200, message: '회원가입이 완료되었습니다.'} );
            });
        });
    }
});