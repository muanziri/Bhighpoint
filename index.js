//module imports
const Express=require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport=require('passport')
const dotenv =require('dotenv');
dotenv.config()

// other Imports
const GoogleAuthenticationRoutes =require("./AuthenticateRouter/GoogleAuthentication")
const FacebookAuthenticate =require("./AuthenticateRouter/FacebookAuthenticate")
const otherRoutes =require("./usualRoutes/idex")




// App starts here
 const app=Express();
 const DB =process.env.MONGO_DB_CONNECTION_LINK;

const PORT=process.env.PORT||3000
app.use(logger('dev'));
app.use(session({
  secret: 'keyboardcat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(GoogleAuthenticationRoutes)
app.use(FacebookAuthenticate)
app.use(otherRoutes)

mongoose
.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then((results) => {  app.listen(PORT,()=>{console.log('listenning on port '+PORT)}); console.log("connected to the database");})
.catch((err) => {console.warn(err);});