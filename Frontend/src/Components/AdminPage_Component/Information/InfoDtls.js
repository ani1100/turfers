import React from 'react'
import InfoDtlsHeader from './InfoDtlsHeader';
import InfoDtlsBasicDtls from './InfoDtlsBasicDtls';
import InfoDtlsBottom1 from './InfoDtlsBottom1';
import InfoDtlsBottom2 from './InfoDtlsBottom2';
import InfoDtlsTurfTiming from './InfoDtlsTurfTiming';

function InfoDtls(props) {
    return (
        <>
            <div className="infodtls">
                <InfoDtlsHeader settab={props.settab}/>
                <br/>
                {props.tab==="bd"&&<InfoDtlsBasicDtls info={props.info} setinfo={props.setinfo} setalertboxcontent={props.setalertboxcontent}/>}
                {props.tab==="tt"&&<InfoDtlsTurfTiming info={props.info} setinfo={props.setinfo}/>}
                <br/>
                {props.tab==="bd"&&<InfoDtlsBottom1 settab={props.settab}/>}
                {props.tab==="tt"&&<InfoDtlsBottom2 cred={props.cred} settab={props.settab} info={props.info} setsaveeditbutton={props.setsaveeditbutton} saveeditbutton={props.saveeditbutton} setalertboxcontent={props.setalertboxcontent}/>}
            </div>
        </>
        );
}
export default InfoDtls;