const express = require('express');
const router = express.Router();
const InfoTurf=require('../model/info_turf');
const SchTurf=require('../model/sch_truf');
const UsrProfile=require('../model/user_profile');
const moment = require('moment/moment');

router.post('/fetchdtls',async(req,res)=>{
    try
    {
        var resp;
        var schdate1=moment(req.body.schdate).format("YYYY-MM-DD");
        var infodtls=await InfoTurf.find({adminid:req.body.tokenid});
        if(infodtls.length===1)
        {
            const schturves=await SchTurf.find({turfid:infodtls[0]._id,schdate:schdate1});
            if(schturves.length===1)
            {
                var listdtls=[];
                for(var i=0;i<schturves[0].turftiming.length;i++)
                {
                    var dtlsobj={
                        "time":schturves[0].turftiming[i].time,
                        "price":schturves[0].turftiming[i].price,
                        "mobile":"-",
                        "name":"-",
                    };
                    if(schturves[0].turftiming[i].status==="B")
                    {
                        const userdtl = await UsrProfile.find({_id:schturves[0].turftiming[i].cstmrid});
                        dtlsobj["status"]="Booked";
                        dtlsobj["name"]=userdtl[0].username;
                        dtlsobj["mobile"]=userdtl[0].phoneno;
                    }
                    else if(schturves[0].turftiming[i].status==="A")
                    {
                        dtlsobj["status"]="Available";
                    }
                    else if(schturves[0].turftiming[i].status==="NB")
                    {
                        dtlsobj["status"]="Not Booked";
                    }
                    else if(schturves[0].turftiming[i].status==="NA")
                    {
                        dtlsobj["status"]="Not Scheduled";
                    }
                    listdtls.push(dtlsobj);
                }
                resp={"Status":"Success","Message":"Fetched Succesfully","Data":listdtls};
            }
            else
            {
                resp={"Status":"Failed","Message":"No turf scheduled on : ".concat(schdate1)};
            }
        }
        else if(infodtls.length===0)
        {
            resp={"Status":"Failed","Message":"No turf scheduled on : ".concat(schdate1)};
        }
        else
        {
            resp={"Status":"Failed","Message":"Unable to fetch Turf Information"};
        }
        res.status(200).json(resp);
    }
    catch(error){

        const resp={"Status":"Failed","Message":"Error in fetching Turf History"};
        res.status(500).json(resp);
    }
})


module.exports = router;