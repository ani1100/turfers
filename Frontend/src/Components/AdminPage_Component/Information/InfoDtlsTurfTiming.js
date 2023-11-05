import React, { useState } from 'react'

function InfoDtlsTurfTiming(props) {
    const [availstyle]=useState({width:"50px",height:"20px",backgroundColor:"green",textAlign:'center',color:'white'});
    const [notavailstyle]=useState({width:"50px",height:"20px",backgroundColor:"white",textAlign:'center',color:'black'});

    let toggleradio= (obj)=>{
        if(obj.status==="A")
        {   
            props.setinfo(previousState => {
                return { ...previousState,turftiming:props.info.turftiming.map(item => {
                    if (item===obj) {
                      return { ...item, status:"NA"}
                    }
                    return item;
                  })}
            });
        }
        else
        {
            props.setinfo(previousState => {
                return { ...previousState,turftiming:props.info.turftiming.map(item => {
                    if (item===obj) {
                      return { ...item, status:"A"}
                    }
                    return item;
                  })}
            });
        }
    }

    return (
        <>
        <div>
            <table className="table center-align-table">
                <tbody>
                    <tr>
                        {props.info.turftiming.slice(0,6).map((obj,i) => (
                            <td key={i}>
                                {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {props.info.turftiming.slice(6,12).map((obj,i) => (
                            <td key={i}>
                                {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {props.info.turftiming.slice(12,18).map((obj,i) => (
                            <td key={i}>
                                {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                            </td>
                        ))}
                    </tr>   
                    <tr>
                        {props.info.turftiming.slice(18,24).map((obj,i) => (
                            <td key={i}>
                                {obj.status==="A" && <div style={availstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                                {obj.status==="NA" && <div style={notavailstyle} onClick={(event)=>toggleradio(obj)}>{obj.time}</div>}
                            </td>
                        ))}
                    </tr>
                </tbody>  
            </table>
        </div>
        </>
        );
}
export default InfoDtlsTurfTiming;