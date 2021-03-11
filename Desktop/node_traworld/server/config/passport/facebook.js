const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../key');
const { get } = require('../../database/database');
const Users = require('../../database/model');

module.exports = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name', 'emails']
}, (accessToken, refreshToken, profile, done) => {
    const database = get();
    if (database) {
        Users.findOne({ userid: profile.id }, (err, user) => {
            if (err) return done(err);
            if (user) {
                return done(null, user);
            }
            const newUser = new Users({
                name: profile.displayName,
                userid: profile.id,
                email: profile.emails[0].value,
                provider: 'facebook',
                authToken: accessToken,
            });
            newUser.save((err) => {
                if (err) { return done(err); }
                return done(null, user, { success: 200, message: "success"});
            });
        });
    }
});