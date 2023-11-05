const express = require('express');
const router = express.Router();
const InfoTurf=require('../model/info_turf');

router.post('/buttonpress',async(req,res)=>{
    try
    {
        var resp;
        var infodtls=await InfoTurf.find({adminid:req.body.tokenid});
        if(infodtls.length===0)
        {
            var timings=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
            var listimings=[];
            for(var i=0;i<timings.length;i++)
            {
                var obj={time:timings[i],status:"NA"};
                listimings.push(obj);
            }
            var info = {
                adminid:req.body.tokenid,
                turfname:"",
                location:"",
                pricewithlight:"",
                pricewithoutlight:"",
                starttimewithoutlight:"",
                endtimewithoutlight:"",
                turftiming:listimings
            };
            resp={"Status":"Save","Message":"Information Does Not Exists","info":info};        
        }
        else if(infodtls.length===1)
        {
            resp={"Status":"Edit","Message":"Information Exists","info":infodtls[0]};
        }  
        else
        {
            resp={"Status":"Failed","Message":"Unable to fetch Turf Information"};
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in fetching Turf Information"};
        res.status(500).json(resp);
    }
})

router.post('/save',async(req,res)=>{
    try
    {
        var resp;
        const infodtls=await InfoTurf.find({adminid:req.body.tokenid});
        if(infodtls.length>0)
        {
            resp={"Status":"Failed","Message":"Information Already Exists. Please Edit."};
        }
        else
        {
            const infoturf= new InfoTurf(req.body.info);
            await infoturf.save();
            resp={"Status":"Success","Message":"Information Saved Successfully"};
        }  
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in saving Turf Information"};
        res.status(500).json(resp);
    }
})

router.post('/edit',async(req,res)=>{
    try
    {
        var resp;
        var infodtls=await InfoTurf.find({adminid:req.body.tokenid});
        if(infodtls.length===1)
        {
            infodtls[0].turfname=req.body.info.turfname;
            infodtls[0].location=req.body.info.location;
            infodtls[0].pricewithlight=req.body.info.pricewithlight;
            infodtls[0].pricewithoutlight=req.body.info.pricewithoutlight;
            infodtls[0].starttimewithoutlight=req.body.info.starttimewithoutlight;
            infodtls[0].endtimewithoutlight=req.body.info.endtimewithoutlight;
            infodtls[0].turftiming=req.body.info.turftiming;
            await infodtls[0].save();
            resp={"Status":"Success","Message":"Information Edited Successfully"};
        }
        else
        {
            resp={"Status":"Failed","Message":"Information Does Not Exist. Cannot Edit"};
        }  
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in editing Turf Information"};
        res.status(500).json(resp);
    }
})

module.exports = router;