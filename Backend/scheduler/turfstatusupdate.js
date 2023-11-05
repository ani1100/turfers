var cron = require('node-cron');
const SchTurf=require('../model/sch_truf');
const moment = require('moment/moment');

const crontask = cron.schedule("0 * * * *", async() => {
  try
  {
    var sysdate=new Date();
    var systimeliteral=String(sysdate.getHours()).concat(":00");
    var sysdateliteral=moment(sysdate).format("YYYY-MM-DD");
    const schturves=await SchTurf.find({schdate:sysdateliteral,'turftiming.status':"A"});
    for(var i=0;i<schturves.length;i++)
    {
      for(var j=0;j<schturves[i].turftiming.length;j++)
      {
        if(schturves[i].turftiming[j].status==="A" && schturves[i].turftiming[j].time<=systimeliteral)
        {
          schturves[i].turftiming[j].status="NB";
        }
      }
      await schturves[i].save();
    }
  }
  catch(error)
  {
    console.log(error);
  }
});

module.exports = crontask;