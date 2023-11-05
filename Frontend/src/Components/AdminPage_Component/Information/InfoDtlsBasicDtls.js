import React from 'react'

function InfoDtlsBasicDtls(props) {
    var timings=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
    var options=[{ value: '', label: '' }];
    for(var i=0;i<timings.length;i++)
    {
        var obj={ value: timings[i], label: timings[i] };
        options.push(obj);
    }

    let alertboxcontentfunc=(title,body)=>{
        props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    let turfnameChange = (event) => {
        props.setinfo(previousState => {
            return { ...previousState, turfname:event.target.value}
        });
    };

    let locationChange = (event) => {
        props.setinfo(previousState => {
            return { ...previousState, location:event.target.value}
        });
    };

    let turfpricewithoutlight = (event) => {
        for(var i=0;i<event.target.value.length;i++)
        {
            if(!(String(event.target.value).charCodeAt(i)>=48 && String(event.target.value).charCodeAt(i)<=57))
            {
                return; 
            }
        }
        props.setinfo(previousState => {
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
        props.setinfo(previousState => {
            return { ...previousState, pricewithlight:event.target.value}
        });  
    };

    let sttimeChange = (event) => {
        if(props.info.endtimewithoutlight==="")
        {
            props.setinfo(previousState => {
                return { ...previousState, starttimewithoutlight:event.target.value}
            });
        }
        else
        {
            if(validatedates(props.info.endtimewithoutlight,event.target.value))
            {
                props.setinfo(previousState => {
                    return { ...previousState, starttimewithoutlight:event.target.value}
                });
            }
            else
            {
                alertboxcontentfunc("ADMIN - INFORMATION","End time should be greater than Start time");
                document.getElementById("alertboxhit").click();
            }
        }  
    };

    let endtimeChange = (event) => {
        if(props.info.starttimewithoutlight==="")
        {
            props.setinfo(previousState => {
                return { ...previousState, endtimewithoutlight:event.target.value}
            });
        }
        else
        {
            if(validatedates(event.target.value,props.info.starttimewithoutlight))
            {
                props.setinfo(previousState => {
                    return { ...previousState, endtimewithoutlight:event.target.value}
                });
            }
            else
            {
                alertboxcontentfunc("ADMIN - INFORMATION","End time should be greater than Start time");
                document.getElementById("alertboxhit").click();
            }
        }
    };

    let validatedates=(val1,val2)=>{
        if(timings.indexOf(val1)>timings.indexOf(val2))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    return (
        <>
            <div>        
                <div className="form-group">
                    <label htmlFor="turfname">Turf Name:</label>
                    <input type="text" className="form-control" id="turfname" value={props.info.turfname} onChange={turfnameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="turfloc">Turf Location:</label>
                    <input type="text" className="form-control" id="turfloc" value={props.info.location} onChange={locationChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tpwol">Turf Price (Without Lights):</label>
                    <input type="text" className="form-control" id="tpwol" value={props.info.pricewithoutlight} onChange={turfpricewithoutlight}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tpwl">Turf Price (With Lights):</label>
                    <input type="text" className="form-control" id="tpwl" value={props.info.pricewithlight} onChange={turfpricewithlight}/>
                </div>
                <div className="form-group form-inline">
                    <label>Turf Timing (Without Lights): </label>{' '}
                    <select style={{width:"20%"}} value={props.info.starttimewithoutlight} onChange={sttimeChange}>
                        {options.map((option,i) => (
                        <option value={option.value} key={i}>{option.label}</option>
                        ))}
                    </select>
                    {' '}To{' '}
                    <select style={{width:"20%"}} value={props.info.endtimewithoutlight} onChange={endtimeChange}>
                        {options.map((option,i) => (
                        <option value={option.value} key={i}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
        );
}
export default InfoDtlsBasicDtls;