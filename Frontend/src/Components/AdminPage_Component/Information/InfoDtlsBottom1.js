import React from 'react'

function InfoDtlsBottom1(props) {

    let slidechange=()=>
    {
        props.settab("tt");
    }

    return (
        <>
        <div style={{textAlign:"right"}}>
            <button type="button" className="btn" onClick={(event)=>slidechange()}>Next</button>
        </div>
        </>
        );
}
export default InfoDtlsBottom1;