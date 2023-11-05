const express = require('express');
const router = express.Router();
const SchTurf=require('../model/sch_truf');
const InfoTurf=require('../model/info_turf');
const UserProfile=require('../model/user_profile');
const moment = require('moment/moment');

router.post('/fetchavailableturfs',async(req,res)=>{
    try
    {
        var resp;
        req.body.bookingdate=moment(req.body.bookingdate).format("YYYY-MM-DD");
        var turflis=await SchTurf.find({schdate:req.body.bookingdate,'turftiming.status':"A"});
        if(turflis.length===0)
        {
            resp={"Status":"NA","Message":"No Turf Available For Booking"};
        }
        else
        {
            var resplis=[];
            for(var i=0;i<turflis.length;i++)
            {
                var timelis=[];
                for(var j=0;j<turflis[i].turftiming.length;j++)
                {
                    if(turflis[i].turftiming[j].time>=req.body.bookingtime && turflis[i].turftiming[j].status==="A")
                    {
                        timelis.push(turflis[i].turftiming[j]);
                    }
                }
                if(timelis.length>0)
                {
                    var infodtls=await InfoTurf.find({_id:turflis[i].turfid});
                    var obj={
                        turfname:infodtls[0].turfname,
                        turfid:turflis[i].turfid,
                        schdate:turflis[i].schdate,
                        turftiming:timelis    
                    };
                    resplis.push(obj);
                }     
            }
            if(resplis.length===0)
            {
                resp={"Status":"NA","Message":"No Turf Available For Booking"};
            }
            else
            {
                resp={"Status":"A","Message":"Turf Available","turflis":resplis};
            }           
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in fetching Available Turves"};
        res.status(500).json(resp);
    }
})

let funcincludetime= (lis,time) =>
{
    for(var i=0;i<lis.length;i++)
    {   
        if(lis[i]===time)
        {
            return true;
        }
    }
    return false;
}

router.post('/savebooking',async(req,res)=>{
    try
    {
        var resp=null;
        const cstmrdtls= await UserProfile.find({userid:req.body.tokenid}); 
        if(cstmrdtls.length===0)
        {
            resp={"Status":"Failed","Message":"Booking Failed. Please Update Profile First."};
        }
        else
        {
            var turflis=await SchTurf.find({schdate:req.body.bookingdtls.schdate,turfid:req.body.bookingdtls.turfid});
            for(var i=0;i<turflis[0].turftiming.length;i++)
            {
                if(funcincludetime(req.body.bookingdtls.selectedtiming,turflis[0].turftiming[i].time))
                {
                    if(turflis[0].turftiming[i].status==="A")
                    {
                        turflis[0].turftiming[i].status="B";
                        turflis[0].turftiming[i].cstmrid=cstmrdtls[0]._id;
                    }
                    else
                    {
                        resp={"Status":"Failed","Message":"Booking Failed. Turf Slot For ".concat(turflis[0].turftiming[i].time).concat(" Already Booked")};
                        break;
                    }
                }
            }
            if(resp===null)
            {
                await turflis[0].save();
                resp={"Status":"Success","Message":"Turf Booked Succesfully"};
            }
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in booking turf"};
        res.status(500).json(resp);
    }
})

module.exports = router;