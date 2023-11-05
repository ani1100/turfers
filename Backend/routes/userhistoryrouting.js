const express = require('express');
const router = express.Router();
const UsrProfile=require('../model/user_profile');
const SchTurf=require('../model/sch_truf');
const InfoTurf=require('../model/info_turf');
const moment = require('moment/moment');

router.post('/buttonpress',async(req,res)=>{
    try
    {
        var sysdate=new Date();
        var systimeliteral1=String(sysdate.getHours()).concat(":00");
        var systimeliteral2=String(sysdate.getHours()).concat(":59");
        var sysdateliteral=moment(sysdate).format("YYYY-MM-DD");
        var resp;
        const profiledtls=await UsrProfile.find({userid:req.body.tokenid});
        if(profiledtls.length===0)
        {
            resp={"Status":"Failed","Message":"Unable to fetch User History"};        
        }
        else if(profiledtls.length===1)
        {
            var userhistorylis=[];
            const schdtls=await SchTurf.find({'turftiming.cstmrid':profiledtls[0]._id}).sort({schdate:'desc'});
            for(var i=0;i<schdtls.length;i++)
            {
                if(userhistorylis.length==20)
                {
                    break;
                }
                var turfinfodtls = await InfoTurf.find({_id:schdtls[i].turfid});
                if(schdtls[i].schdate===sysdateliteral)
                {
                    for(var j=schdtls[i].turftiming.length-1;j>=0;j--)
                    {
                        if(schdtls[i].turftiming[j].cstmrid===profiledtls[0]._id.toString())
                        {
                            var obj={
                                turfname:turfinfodtls[0].turfname,
                                schdate:schdtls[i].schdate
                            };
                            obj["price"]=schdtls[i].turftiming[j].price;
                            obj["time"]=schdtls[i].turftiming[j].time;
                            if(schdtls[i].turftiming[j].time<systimeliteral1)
                            {
                                obj["status"]="Completed";
                            }
                            else if(schdtls[i].turftiming[j].time<systimeliteral2)
                            {
                                obj["status"]="In-Progress";
                            }
                            else
                            {
                                obj["status"]="Scheduled";
                            }
                            userhistorylis.push(obj);
                        }
                    }
                }
                else if(schdtls[i].schdate<sysdateliteral)
                {
                    for(var j=schdtls[i].turftiming.length-1;j>=0;j--)
                    {
                        if(schdtls[i].turftiming[j].cstmrid===profiledtls[0]._id.toString())
                        {
                            var obj={
                                turfname:turfinfodtls[0].turfname,
                                schdate:schdtls[i].schdate
                            };
                            obj["price"]=schdtls[i].turftiming[j].price;
                            obj["time"]=schdtls[i].turftiming[j].time;
                            obj["status"]="Completed";   
                            userhistorylis.push(obj);
                        }
                    }
                }
                else
                {
                    for(var j=schdtls[i].turftiming.length-1;j>=0;j--)
                    {
                        if(schdtls[i].turftiming[j].cstmrid===profiledtls[0]._id.toString())
                        {
                            var obj={
                                turfname:turfinfodtls[0].turfname,
                                schdate:schdtls[i].schdate
                            };
                            obj["price"]=schdtls[i].turftiming[j].price;
                            obj["time"]=schdtls[i].turftiming[j].time;
                            obj["status"]="Scheduled";   
                            userhistorylis.push(obj);
                        }
                    }
                }
            }
            if(userhistorylis.length==0)
            {
                resp={"Status":"Failed","Message":"No Turf Booked Till Now"};
            }
            else
            {
                resp={"Status":"Success","Message":"User history fetched successfully","userhistorylis":userhistorylis};
            }
        }  
        else
        {
            resp={"Status":"Failed","Message":"Unable to fetch User History"};
        }
        res.status(200).json(resp);
    }
    catch(error){
        const resp={"Status":"Failed","Message":"Error in fetching User History"};
        res.status(500).json(resp);
    }
})

module.exports = router;