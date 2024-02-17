const {Router}=require('express')

const app = Router()
const checkAuthenticated = (req, res, next) => {
  if(req.user){
        next();
    }else{
     res.json({'loginStatus':'not logged In'})
    }
  };
app.get('/user',checkAuthenticated,(req,res)=>{
   res.json(req.user)
})

module.exports= app