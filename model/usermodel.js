const mongoose=require('mongoose');
const { randomBytes, createHmac } = require('crypto');
const bcrypt = require('bcryptjs');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt: {
        type: String
    },
    proimage: {
        type: String,
        default: "./image/avatar.jpg"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=randomBytes(16).toString('hex');
    const hashpassword=createHmac('sha256',salt)
            .update(this.password)
            .digest('hex');
    this.salt=salt;
    this.password=hashpassword;
    next();
    
})

userSchema.statics.matchPassword=async function(email,password){
    const user=await this.findOne({email});
    if(!user){
        throw new Error('User not found');
    }

    const salt=user.salt;
    const hashpassword=user.password;

    const userProvideHash=createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    if(hashpassword!==userProvideHash) throw new Error('password does mot match');
    return { ...user.toObject(),password:undefined,salt:undefined};

}


module.exports=mongoose.model('User',userSchema);