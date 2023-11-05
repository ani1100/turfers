require('dotenv').config();
const mongoose=require('mongoose');
const db_url=process.env.DB_URL;
mongoose.set('strictQuery', false);

const connect = ()=>{
    mongoose.connect(db_url).then((val)=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log("Error in connecting DB");
        console.log(err);
    })
};

module.exports=connect;