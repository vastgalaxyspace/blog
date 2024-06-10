const User=require('../model/usermodel');



module.exports.signup=async (req,res)=>{
    const {username,email,password}=req.body;
    console.log(req.body);
    await User.create({
        username,
        email,
        password
    });
    return res.redirect('/user/signin');

};

module.exports.signin=async (req,res)=>{

    const {email,password}=req.body;
    const user = await User.matchPassword(email, password);
    console.log("User signed in successfully");
    return res.redirect("/");   


}

