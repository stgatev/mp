import { Router } from 'express';
import * as passport from 'passport';

let router = Router()
    .get('/login', (req, res) => {
        res.render('login', { user: req.user });
    })

    .get('/logout', (req, res) => {
        res.send('logging out');
    })

    .get('/google', passport.authenticate('google', {
        scope: ['profile']
    }))

    .get('/google/redirect', passport.authenticate('google'), (req, res) => {
        res.send('you reached the redirect URI');
    });

export { router };
