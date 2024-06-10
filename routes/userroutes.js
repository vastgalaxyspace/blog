const express=require('express');
const router=express.Router();
const User=require('../model/usermodel');

router.get('/signup',(req,res)=>{
    return res.render('signup.ejs');
});
router.get('/signin',(req,res)=>{
   return res.render('signin.ejs');
});
router.post('/signup',async (req,res)=>{
    const {username,email,password}=req.body;
    console.log(req.body);
    await User.create({
        username,
        email,
        password
    });
    return res.redirect('/user/signin');

});
router.post('/signin', async (req,res)=>{

    const {email,password}=req.body;
    const user = await User.matchPassword(email, password);
    console.log("User signed in successfully");
    return res.redirect("/");   


}
);



module.exports=router;