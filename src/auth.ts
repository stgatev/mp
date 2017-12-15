import * as express from 'express';
import * as passport from 'passport';
import * as google from 'passport-google-oauth2';
import * as config from 'config';
import { Identity, IUser, UserModel, IUserDocument } from './models/user';
const cookie = require('cookie-session');

class Google {
    public static routes: express.Router;

    public static init() {
        passport.serializeUser((user: IUser, done) => { 
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            UserModel.findById(id).then((user) => {
                done(null, user);
            })
        });

        passport.use(new google.Strategy(
            Object.assign({ callbackURL: '/auth/google/redirect' } as google.StrategyOptions, config.get('auth.google')),
            (accessToken, refreshToken, profile, done) => {
                UserModel.findByIdentity({ provider: 'Google', id: profile.id }).then((user: IUser) => {
                    if (user) {
                        done(null, user);
                    } else {
                        new UserModel({
                            identity: {
                                provider: 'Google',
                                id: profile.id
                            },
                            name: profile.displayName
                        }).save().then((user: IUser) => {
                            done(null, user);
                        }).catch((err) => {
                            console.log('Could not create new user', err);
                        });
                    }
                });
            }
        ));

        this.routes = express.Router()
            .get('/login', (req: express.Request, res: express.Response) => {
                res.render('login', { user: req.user });
            })

            .get('/logout', (req, res) => {
                res.send('logging out');
            })

            .get('/google', passport.authenticate('google', {
                scope: ['profile']
            }))

            .get('/google/redirect', passport.authenticate('google'), (req, res) => {
                res.send(req.user);
            });
    }
}

export { Google };