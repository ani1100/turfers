import React from 'react'
function AlertBox(props) {
    return (
        <>
        <button type="button" id="alertboxhit" className="btn btn-info btn-lg" style={{ display: "none"}} data-toggle="modal" data-target="#myModal">AlertBox</button>
        <div id="myModal" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title"  style={{textAlign:'center'}}>{props.alertboxcontent.title}</h4>
            </div>
            <div className="modal-body">
                <h4 style={{textAlign:'center'}}>{props.alertboxcontent.body}</h4>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
        );
}
export default AlertBox;