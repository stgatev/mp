import { Router } from 'express';
import { authenticate } from 'passport';
import { Request, Response } from 'express';
const router = Router()
    .get('/login', (req: Request, res: Response) => {
        res.render('login', { user: req.user });
    })

    .get('/logout', (req, res) => {
        res.send('logging out');
    })

    .get('/google', authenticate('google', {
        scope: ['profile']
    }))

    .get('/google/redirect', authenticate('google'), (req, res) => {
        res.send('you reached the redirect URI');
    });

export { router };
