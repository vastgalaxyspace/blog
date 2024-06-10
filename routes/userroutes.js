const express=require('express');
const router=express.Router();
const User=require('../model/usermodel');
const {signup,signin}=require('../controller/userauthcontroller');

router.get('/signup',(req,res)=>{
    return res.render('signup.ejs');
});
router.get('/signin',(req,res)=>{
   return res.render('signin.ejs');
});
router.post('/signup',signup);
router.post('/signin',signin);



module.exports=router;