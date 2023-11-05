const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    turfid:{required:true,type:String},
    schdate:{required:true,type:String},
    turftiming: [{time:{required:true,type:String},
        status:{required:true,type:String},
        price:{required:true,type:String},
        cstmrid:{type:String}}
        ]
});

module.exports = mongoose.model('SchTurf',schema);