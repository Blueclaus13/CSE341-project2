const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const createError = require('http-errors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
  next();
});
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, 
function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}));

passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((user, done)=>{
  done(null, user);
});

  
  app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });

app.get('/', (req, res)=>{ res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}`: `Logged out`)});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
(req, res)=>{
  req.session.user = req.user;
  res.redirect('/');
});

// app.use((req, res, next)=>{
//     next(createError(404, 'Not found'));
//   });

mongodb.initDb((err)=>{
    if(err){
      console.log("There is an error: "+ err);
    }else{
      app.listen(PORT, () => {
        console.log('Database conected and Web Server is listening at port ' + (PORT));
      });
    }
  });