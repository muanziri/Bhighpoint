const passport=require('passport')
const dotenv=require('dotenv')
const { Router } = require('express');
const Users=require('../Skemas/user_Skema')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   Users.findOne({AuthId:profile.id})
   .then((currentUser)=>{
    if(currentUser){
      done(null,currentUser);
    }else{
      new Users({
        userName:profile.displayName,
        Email:profile.email,
        AuthId:profile.id,
        Profilephoto:profile.picture
      }).save().then((user)=>{
        done(null,user)
      })
     }
   })
  }
));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.json({'Authentiaction_status':'Authenticated'});
  });


module.exports= app;