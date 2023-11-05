var bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Credadmin=require('../model/cred_admin');

router.post('/register',async(req,res)=>{
    try
    {
        const data=await Credadmin.find({userid:req.body.credentials.userid});
        var resp;
        if(data.length>0)
        {
            resp={"Status":"Failed","Message":"User ID Already Exists"};
        }
        else
        {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.credentials.password,salt);
            const newuser= new Credadmin({
                userid:req.body.credentials.userid,
                password:hash
            });
            await newuser.save();
            resp={"Status":"Success","Message":"Registered Successfully"};
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in Registration"};
        res.status(500).json(resp);
    }
})

router.post('/login',async(req,res)=>{
    try
    {
        const data1=await Credadmin.find({userid:req.body.credentials.userid});
        var resp;
        if(data1.length===1)
        {
            var hash = data1[0].password;
            var value= bcrypt.compareSync(req.body.credentials.password,hash);
            if(value===false)
            {
                resp={"Status":"Failed","Message":"Incorrect Password"};
            }
            else
            {
                resp={"Status":"Success","tokenid":data1[0]._id};
            }
        }
        else
        {
            resp={"Status":"Failed","Message":"User ID Does Not Exist"};
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in login"};
        res.status(500).json(resp);
    }
})

module.exports = router;