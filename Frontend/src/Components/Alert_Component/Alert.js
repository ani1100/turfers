import React from 'react'
function Alert(props) {
    return (
        <>
        {props.type==="error" && <div className="alert alert-danger mx-2" role="alert">
            {props.alertmsg}
        </div>}
        {props.type==="success" && <div className="alert alert-success mx-2" role="alert">
            {props.alertmsg}
        </div>}
        </>
        );
}
export default Alert;