import React from 'react'

function InfoDtlsHeader(props) {

    let tabchange=(obj)=>
    {
        props.settab(obj);
    }

    return (
        <>
        <div>
            <button type="button" className="btn" onClick={event => tabchange('bd')}>Basic Details</button>{' '}
            <button type="button" className="btn" onClick={event => tabchange('tt')}>Slot Timings</button>
        </div>
        </>
        );
}
export default InfoDtlsHeader;