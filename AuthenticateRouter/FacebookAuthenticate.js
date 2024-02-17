const passport=require('passport')
const dotenv=require('dotenv')
const { Router } = require('express');
const Users=require('../Skemas/user_Skema')
const FacebookStrategy = require('passport-facebook').Strategy;
const app=Router();
dotenv.config();
passport.serializeUser((user1 ,done)=>{
done(null,user1.id);
})
passport.deserializeUser((id,done)=>{
 Users.findById(id).then((user)=>{ 
done(null,user);
 })
})
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
  },
  function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  }
));


app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports= app;