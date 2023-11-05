import React from 'react'
import { BASE_URL } from '../../Url';

function SubHeaders(props) {
    let alertboxcontentfunc=(title,body)=>{
        props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    let subheadertoggle=async (obj)=>
    {
        if(props.cred.type==="Admin")
        {
            if(obj==="INFORMATION")
            {            
                fetch(BASE_URL+'/turfinfo/buttonpress',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                        tokenid:props.cred.tokenid
                })})
                .then((res) => res.json())
                .then( async (data) => {
                    if(data.Status==="Edit")
                    {
                        await props.setinfo(data.info);
                        props.setsaveeditbutton("Edit");
                        props.setview(obj);
                        props.settab("bd");
                    }
                    else if(data.Status==="Save")
                    {
                        await props.setinfo(data.info);
                        props.setsaveeditbutton("Save");
                        props.setview(obj);
                        props.settab("bd");
                    }
                    else
                    {  
                        alertboxcontentfunc("Admin - INFORMATION",data.Message);
                        document.getElementById("alertboxhit").click();
                    }
                })
                .catch((err) => {
                    alertboxcontentfunc("Admin - INFORMATION","Error in processing the data");
                    document.getElementById("alertboxhit").click();
                });
            }
            else if(obj==="SCHEDULE")
            {
                fetch(BASE_URL+'/turfinfo/buttonpress',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    tokenid:props.cred.tokenid
                })})
                .then((res) => res.json())
                .then( async (data) => {
                    if(data.Status==="Edit")
                    {
                        await props.setview(obj);
                        var temp={
                            tokenid:props.cred.tokenid,
                            startdate:"yyyy-mm-dd",
                            enddate:"yyyy-mm-dd",
                            turftiming:data.info.turftiming,
                            pricewithoutlight:data.info.pricewithoutlight,
                            pricewithlight:data.info.pricewithlight,
                            starttimewithoutlight:data.info.starttimewithoutlight,
                            endtimewithoutlight:data.info.endtimewithoutlight
                        };
                        await props.setschedule(temp);
                    }
                    else if(data.Status==="Save")
                    {
                        alertboxcontentfunc("Admin - SCHEDULE","Please fill the information to schedule");
                        document.getElementById("alertboxhit").click();
                    }
                    else
                    {  
                        alertboxcontentfunc("Admin - SCHEDULE",data.Message);
                        document.getElementById("alertboxhit").click();
                    }
                })
                .catch((err) => {
                    alertboxcontentfunc("Admin - SCHEDULE","Error in processing the data");
                    document.getElementById("alertboxhit").click();
                });      
            }
            else if(obj==="HISTORY")
            {
                props.setview(obj);
                props.setschdate("yyyy-mm-dd");
                props.setturfdtlslist([]);
            }
        }
        else
        {
            if(obj==="PROFILE")
            {
                fetch(BASE_URL+'/userprofile/buttonpress',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                        tokenid:props.cred.tokenid
                })})
                .then((res) => res.json())
                .then( async (data) => {
                    if(data.Status==="Edit")
                    {
                        props.setview(obj);
                        props.setsaveeditbutton("Edit");
                        await props.setprofile(data.profile);
                    }
                    else if(data.Status==="Save")
                    {
                        props.setview(obj);
                        props.setsaveeditbutton("Save");
                        await props.setprofile(data.profile);
                    }
                    else
                    {  
                        alertboxcontentfunc("USER - PROFILE",data.Message);
                        document.getElementById("alertboxhit").click();
                    }
                })
                .catch((err) => {
                    alertboxcontentfunc("USER - PROFILE","Error in processing the data");
                    document.getElementById("alertboxhit").click();
                });
            }
            else if(obj==="BOOK SLOT")
            {
                props.setview("BOOK SLOT");
                await props.setbookingdate(fetchdates());
                await props.fetchturfs();
            }
            else if(obj==="USER HISTORY")
            {
                fetch(BASE_URL+'/userhistory/buttonpress',{
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                            tokenid:props.cred.tokenid
                    })})
                    .then((res) => res.json())
                    .then( async (data) => {
                        if(data.Status==="Success")
                        {
                            props.setview(obj);
                            await props.userhistorydtlschangefunc(data.userhistorylis);
                        }
                        else
                        {  
                            alertboxcontentfunc("USER - USER HISTORY",data.Message);
                            document.getElementById("alertboxhit").click();
                        }
                    })
                    .catch((err) => {
                        alertboxcontentfunc("USER - USER HISTORY","Error in processing the data");
                        document.getElementById("alertboxhit").click();
                    });
            }
        }
    }

    let fetchdates=()=>
    {
        var date=new Date();
        var year1 = String(date.getFullYear());
        var month1 = String(date.getMonth()+1);
        month1=(month1.length===1)?"0".concat(month1):month1;
        var day1 = String(date.getDate());
        day1=(day1.length===1)?"0".concat(day1):day1;
        var sysdate=year1.concat("-").concat(month1).concat("-").concat(day1);
        return sysdate;
    }

    return (
        <>
            <div className="out">
                <div className="vertical">
                <ul>
                    {props.contents.map((obj,i) => <li onClick={event => subheadertoggle(obj)} key={i}><a>{obj}</a></li>)}
                </ul> 
                </div> 
            </div>
        </>
        );
}
export default SubHeaders;