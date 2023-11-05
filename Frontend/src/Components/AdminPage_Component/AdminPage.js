import React,{ useEffect, useState } from 'react'
import SubHeaders from '../Header_Component/SubHeaders';
import Header1 from '../Header_Component/Header1';
import InfoDtls from './Information/InfoDtls';
import AdminHome from './Admin_HomePage/AdminHome1';
import AlertBox from '../Alert_Component/AlertBox';
import ScheduleTurf from './Schedule/ScheduleTurf';
import FetchTurfDtls from './Turf_History/FetchTurfDtls';

function AdminPage(props) {
    const[tab,settab]=useState("bd");
    const[info,setinfo]=useState({});
    const[schedule,setschedule]=useState({});
    const[saveeditbutton,setsaveeditbutton]=useState("");
    const [alertboxcontent,setalertboxcontent]=useState({});
    const [schdate,setschdate]=useState({});
    const [turfdtlslist,setturfdtlslist]=useState([]);
    useEffect(() => {
        if(props.cred.userid==="")
        {
            window.location.href = "/";
        }
    });
    return (
        <>
            <div className="backcolor">
                <AlertBox alertboxcontent={alertboxcontent}/>
                <Header1 cred={props.cred} setview={props.setview}/>
                <SubHeaders contents={props.contents} setview={props.setview} settab={settab} cred={props.cred} setinfo={setinfo} setsaveeditbutton={setsaveeditbutton} setalertboxcontent={setalertboxcontent} setschedule={setschedule} setschdate={setschdate} setturfdtlslist={setturfdtlslist}/>
                {props.view==="Homepage" && <AdminHome/>}
                {props.view==="INFORMATION" && <InfoDtls cred={props.cred} tab={tab} settab={settab} info={info} setinfo={setinfo} saveeditbutton={saveeditbutton} setsaveeditbutton={setsaveeditbutton} setalertboxcontent={setalertboxcontent}/>}
                {props.view==="SCHEDULE" && <ScheduleTurf schedule={schedule} setschedule={setschedule} setalertboxcontent={setalertboxcontent}/>}
                {props.view==="HISTORY" && <FetchTurfDtls schdate={schdate} setschdate={setschdate} cred={props.cred} setalertboxcontent={setalertboxcontent} turfdtlslist={turfdtlslist} setturfdtlslist={setturfdtlslist}/>}
                <h1 className="clear1">&nbsp;</h1>
            </div>
        </>
        );
}
export default AdminPage;