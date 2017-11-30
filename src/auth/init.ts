import * as passport from 'passport';
import * as google from 'passport-google-oauth20';
import * as config from 'config';

passport.use(
    new google.Strategy({
        clientID: config.get("auth.google.web.client_id"),
        clientSecret: config.get("auth.google.web.client_secret"),
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);