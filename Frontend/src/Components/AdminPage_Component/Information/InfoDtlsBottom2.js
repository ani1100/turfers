import React from 'react'
import { BASE_URL } from '../../../Url';

function InfoDtlsBottom2(props) {
    
    let alertboxcontentfunc=(title,body)=>{
        props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    let validateinfo=()=>
    {
        if(props.info.turfname===""||props.info.location===""||props.info.pricewithlight===""||props.info.pricewithoutlight===""||props.info.starttimewithoutlight===""||props.info.endtimewithoutlight==="")
        {
            return false;
        }
        for(var i=0;i<props.info.turftiming.length;i++)
        {
            if(props.info.turftiming[i].status==="A")
            {
                return true;
            }
        }
        return false;
    }

    let editinfo=()=>
    {
        if(validateinfo()===false)
        {
            alertboxcontentfunc("Admin - INFORMATION","Please fill entire details");
            document.getElementById("alertboxhit").click();
            return;
        }
        fetch(BASE_URL+'/turfinfo/edit',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:props.cred.tokenid,
                info:props.info
            })})
            .then((res) => res.json())
            .then( async (data) => {
                if(data.Status==="Success")
                {
                    alertboxcontentfunc("Admin - INFORMATION",data.Message);
                }
                else
                {
                    alertboxcontentfunc("Admin - INFORMATION",data.Message);
                }
                document.getElementById("alertboxhit").click();
            })
            .catch((err) => {
                alertboxcontentfunc("Admin - INFORMATION","Error in processing the data");
                document.getElementById("alertboxhit").click();
            });
    }

    let saveinfo=()=>
    {
        if(validateinfo()===false)
        {
            alertboxcontentfunc("Admin - INFORMATION","Please fill entire details");
            document.getElementById("alertboxhit").click();
            return;
        }
        fetch(BASE_URL+'/turfinfo/save',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:props.cred.tokenid,
                info:props.info
            })})
            .then((res) => res.json())
            .then( async (data) => {
                if(data.Status==="Success")
                {
                    alertboxcontentfunc("Admin - INFORMATION",data.Message);
                    props.setsaveeditbutton("Edit");
                }
                else
                {
                    alertboxcontentfunc("Admin - INFORMATION",data.Message);
                }
                document.getElementById("alertboxhit").click();
            })
            .catch((err) => {
                alertboxcontentfunc("Admin - INFORMATION","Error in processing the data");
                document.getElementById("alertboxhit").click();
            });
    }

    let slidechange=()=>
    {
        props.settab("bd");
    }

    return (
        <>
        <div style={{textAlign:"right"}}>
            <button type="button" className="btn" onClick={(event)=>slidechange()}>Prev</button>{' '}
            {props.saveeditbutton==="Save" && <button type="button" className="btn" onClick={(event)=>saveinfo()}>Save</button>}
            {props.saveeditbutton==="Edit" && <button type="button" className="btn" onClick={(event)=>editinfo()}>Edit</button>}
        </div>
        </>
        );
}
export default InfoDtlsBottom2;