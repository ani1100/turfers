import React from 'react'
import { BASE_URL } from '../../../Url';

function FetchTurfDtls(props) {
    
    let alertboxcontentfunc=(title,body)=>{
        props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    let schdatechange=(event)=>{
        props.setschdate(event.target.value);
    } 

    let fetchdtls=()=>{
        props.setturfdtlslist([]);
        fetch(BASE_URL+'/turfhistory/fetchdtls',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:props.cred.tokenid,
                schdate:props.schdate
            })})
            .then((res) => res.json())
            .then( async (data) => {
                if(data.Status==="Failed")
                {
                    alertboxcontentfunc("Admin - HISTORY",data.Message);
                    document.getElementById("alertboxhit").click();
                }
                else
                {  
                    props.setturfdtlslist(data.Data);
                }
            })
            .catch((err) => {
                alertboxcontentfunc("Admin - HISTORY","Error in processing the data");
                document.getElementById("alertboxhit").click();
            });  
    }

    return (
        <>
            <div className="infodtls">
                <div style={{textAlign:"center"}}>
                    <input type="date" className="btn" value={props.schdate} onChange={schdatechange}/>
                    <button type="button" className="btn" onClick={fetchdtls} disabled={props.schdate==='yyyy-mm-dd'}><span className="glyphicon glyphicon-search"></span></button>
                </div>
                <br/><br/>
                {props.turfdtlslist.length>0 && <div>
                    <table className="table centeralign table-bordered text-center">
                        <thead>
                            <tr style={{backgroundColor:"#FFF0F5"}}>
                                <td>Time</td>
                                <td>Price</td>
                                <td>Status</td>
                                <td>Name</td>
                                <td>Mobile</td>
                            </tr>
                        </thead>  
                        <tbody>
                            {props.turfdtlslist.map((obj,i)=> (
                                <tr Key={i} style={{backgroundColor:"ghostwhite"}}>
                                    <td>{obj.time}</td>
                                    <td>{obj.price}</td>
                                    <td>{obj.status}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

            </div>
        </>
        );
}
export default FetchTurfDtls;