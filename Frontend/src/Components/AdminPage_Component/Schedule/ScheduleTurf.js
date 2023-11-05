import React, { useState } from 'react'
import { BASE_URL } from '../../../Url';

function ScheduleTurf(props) {
    const [availstyle]=useState({width:"50px",height:"20px",backgroundColor:"green",textAlign:'center',color:'white'});
    const [notavailstyle]=useState({width:"50px",height:"20px",backgroundColor:"white",textAlign:'center',color:'black'});

    let alertboxcontentfunc=(title,body)=>{
        props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    let toggleradio= (obj)=>{
        if(obj.status==="A")
        {   
            props.setschedule(previousState => {
                return { ...previousState,turftiming:props.schedule.turftiming.map(item => {
                    if (item===obj) {
                      return { ...item, status:"NA"}
                    }
                    return item;
                  })}
            });
        }
        else
        {
            props.setschedule(previousState => {
                return { ...previousState,turftiming:props.schedule.turftiming.map(item => {
                    if (item===obj) {
                      return { ...item, status:"A"}
                    }
                    return item;
                  })}
            });
        }
    }

    let turfpricewithoutlight = (event) => {
        for(var i=0;i<event.target.value.length;i++)
        {
            if(!(String(event.target.value).charCodeAt(i)>=48 && String(event.target.value).charCodeAt(i)<=57))
            {
                return; 
            }
        }
        props.setschedule(previousState => {
            return { ...previousState, pricewithoutlight:event.target.value}
        });  
    }        

    let turfpricewithlight = (event) => {
        for(var i=0;i<event.target.value.length;i++)
        {
            if(!(String(event.target.value).charCodeAt(i)>=48 && String(event.target.value).charCodeAt(i)<=57))
            {
                return; 
            }
        }
        props.setschedule(previousState => {
            return { ...previousState, pricewithlight:event.target.value}
        });  
    };

    let startdatechange= (event)=>{
        props.setschedule(previousState => {
            return { ...previousState, startdate:event.target.value}
        });  
    }

    let enddatechange= (event)=>{
        props.setschedule(previousState => {
            return { ...previousState, enddate:event.target.value}
        });  
    }

    let schedulevalidations=()=>
    {
        if(props.schedule.pricewithlight===""||props.schedule.pricewithoutlight===""||props.schedule.startdate==="yyyy-mm-dd"||props.schedule.enddate==="yyyy-mm-dd")
        {
            return false;
        }
        for(var i=0;i<props.schedule.turftiming.length;i++)
        {
            if(props.schedule.turftiming[i].status==="A")
            {
                return true;
            }
        }
        return false;
    }

    let dateval=(stdate,etdate)=>
    {
        var sysdate =  new Date();
        var stdate1=new Date(stdate);
        var etdate1=new Date(etdate);
        var outdate =  new Date(sysdate);
        outdate.setTime(outdate.getTime() + 86400000*30);
        if(sysdate>=stdate1)
        {
            return "Start Date should be greater than system date";
        }
        if(stdate1>etdate1)
        {
            return "Start Date cannot be greater than start date";
        }
        if(etdate1>outdate)
        {
            return "Can only schedule for next 30 days";
        }
        return "ok"
    }

    let addpriceschedule=()=>
    {
        for(var i=0;i<props.schedule.turftiming.length;i++)
        {
            if(props.schedule.turftiming[i].time>=props.schedule.starttimewithoutlight && props.schedule.turftiming[i].time<=props.schedule.endtimewithoutlight)
            {
                props.schedule.turftiming[i].price=props.schedule.pricewithoutlight;
            }
            else
            {
                props.schedule.turftiming[i].price=props.schedule.pricewithlight;
            }
        } 
    }

    let saveschedule=async ()=>
    {
        if(schedulevalidations()===false)
        {
            alertboxcontentfunc("Admin - SCHEDULE","Please fill in entire details");
            document.getElementById("alertboxhit").click();
            return;
        }
        var otpt=dateval(props.schedule.startdate,props.schedule.enddate);
        if(otpt!=="ok")
        {
            alertboxcontentfunc("Admin - SCHEDULE",otpt);
            document.getElementById("alertboxhit").click();
            return;
        }
        addpriceschedule();
        fetch(BASE_URL+'/turfschedule/schedule',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(props.schedule)})
            .then((res) => res.json())
            .then( async (data) => {
                if(data.Status==="Success")
                {
                    alertboxcontentfunc("Admin - SCHEDULE",data.Message);
                }
                else
                {
                    alertboxcontentfunc("Admin - SCHEDULE",data.Message);
                }
                document.getElementById("alertboxhit").click();
            })
            .catch((err) => {
                alertboxcontentfunc("Admin - SCHEDULE","Error in processing the data");
                document.getElementById("alertboxhit").click();
            });
    }

    return (
        <>
            <div className="infodtls">
                <br/>
                <div>
                    <table className="table center-align-table">
                        <tbody>
                            <tr>
                                {props.schedule.turftiming.slice(0,6).map((obj,i) => (
                                    <td key={i}>
                                        {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                        {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                {props.schedule.turftiming.slice(6,12).map((obj,i) => (
                                    <td key={i}>
                                        {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                        {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                {props.schedule.turftiming.slice(12,18).map((obj,i) => (
                                    <td key={i}>
                                        {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                        {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                    </td>
                                ))}
                            </tr>   
                            <tr>
                                {props.schedule.turftiming.slice(18,24).map((obj,i) => (
                                    <td key={i}>
                                        {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                        {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                    </td>
                                ))}
                            </tr>
                        </tbody>  
                    </table>
                </div>
                <br/>       
                <div>
                    <div className="form-group">
                        <label htmlFor="tpwol">Turf Price (Without Lights):</label>
                        <input type="text" className="form-control" id="tpwol" value={props.schedule.pricewithoutlight} onChange={turfpricewithoutlight}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tpwl">Turf Price (With Lights):</label>
                        <input type="text" className="form-control" id="tpwl" value={props.schedule.pricewithlight} onChange={turfpricewithlight}/>
                    </div>

                    <div className="form-group form-inline">
                        <label>Start Date</label>&nbsp;
                        <div className="form-group" htmlFor="startdate">
                            <input type="date" className="form-control" id="startdate" value={props.schedule.startdate} onChange={startdatechange}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>End Date</label>&nbsp;
                        <div className="form-group" htmlFor="enddate">
                            <input type="date" className="form-control" id="enddate" value={props.schedule.enddate} onChange={enddatechange} disabled={props.schedule.startdate==='yyyy-mm-dd'}/>
                        </div>
                    </div>    
                    
                    <div style={{textAlign:"right"}}>
                        <button type="button" className="btn" onClick={(event)=>saveschedule()}>Save</button>
                    </div>
                </div>
            </div>
        </>
        );
}
export default ScheduleTurf;