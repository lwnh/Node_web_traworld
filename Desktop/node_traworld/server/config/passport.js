const local_signup = require('./passport/local_signup');
const local_login = require('./passport/local_login');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser() 호출!', user);
        done(null, user.userid);   
    });

    passport.deserializeUser((user, done) => {
        console.log('deserializeUser() 호출!', user);
        done(null, user);
    });

    passport.use('local-signup', local_signup);
    passport.use('local-login', local_login);
}