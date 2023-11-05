const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    userid:{required:true,type:String},
    password:{required:true,type:String},
});

module.exports = mongoose.model('CredAdmin',schema);