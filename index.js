const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userrouter=require('./routes/userroutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home.ejs');
})

app.use('/user',userrouter);








const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
app.listen(PORT,()=>{
    try{
        console.log(`Server running on port ${PORT}`);
    }catch(err){    
        console.error(err.message);
        process.exit(1);
}
});