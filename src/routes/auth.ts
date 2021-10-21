import passport from 'passport';
import express from 'express';

const mockApp = express();

function auth(app: typeof mockApp): void {
  app.get('/auth/test', (req, res) => {
    console.log('WORKING');
    res.send('Auth working properly');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}

export default auth;
