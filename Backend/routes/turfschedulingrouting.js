const express = require('express');
const router = express.Router();
const SchTurf=require('../model/sch_truf');
const InfoTurf=require('../model/info_turf');
const moment = require('moment/moment');

router.post('/schedule',async(req,res)=>{
    try
    {
        var resp;
        var startdate=moment(req.body.startdate).format("YYYY-MM-DD");
        var enddate=moment(req.body.enddate).format("YYYY-MM-DD");
        var infodtls=await InfoTurf.find({adminid:req.body.tokenid});
        if(infodtls.length===1)
        {
            const schturves=await SchTurf.find({turfid:infodtls[0]._id,schdate:{$gte:startdate,$lte:enddate}}).sort({schdate:'asc'});
            if(schturves.length===0)
            {
                var lisdates=await fetchdates(startdate,enddate);
                for(var i=0;i<lisdates.length;i++)
                {
                    const schturfobj= new SchTurf({
                        turfid:infodtls[0]._id,
                        schdate:lisdates[i],
                        turftiming:req.body.turftiming
                    });
                    await schturfobj.save();
                }
                resp={"Status":"Success","Message":"Turf Scheduled Successfully"};
            }
            else
            {
                resp={"Status":"Failed","Message":"Failed to schedule. Already Scheduled for ".concat(schturves[0].schdate)};
            }
        }
        else
        {
            resp={"Status":"Failed","Message":"Failed to schedule. Unable to fetch Turf Information"};
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in scheduling Turf"};
        res.status(500).json(resp);
    }
})

let fetchdates=async (startdate,enddate)=>
{
    var lisdates=[];
    while(1)
    {
        var scdt=new Date(startdate);
        lisdates.push(moment(scdt).format("YYYY-MM-DD"));
        if(moment(scdt).format("YYYY-MM-DD")===enddate)
        {
            break;
        }
        scdt.setTime(scdt.getTime() + 86400000); 
        startdate=moment(scdt).format("YYYY-MM-DD");
    }
    return lisdates;
}

module.exports = router;