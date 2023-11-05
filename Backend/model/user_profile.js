const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    userid:{required:true,type:String},
    username:{required:true,type:String},
    phoneno:{required:true,type:String},
    emailid:{required:true,type:String},
});

module.exports = mongoose.model('UserProfile',schema);