import React from 'react'
import { BASE_URL } from '../../../Url';

class BookSlotsTable extends React.Component {
    constructor(props) {
        super(props);
        this.alertboxcontentfunc=this.alertboxcontentfunc.bind(this);
        this.confirmbooking=this.confirmbooking.bind(this);
        this.state={
        };   
    }

    alertboxcontentfunc(title,body){
        this.props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    async confirmbooking()
    {
        var seltimings=[];
        for(var i=0;i<this.props.tabledtls.length;i++)
        {
            seltimings.push(this.props.tabledtls[i].time);
        }
        var bookingdtls={
            turfid: this.props.tableturfid,
            schdate: this.props.tableschdate,
            selectedtiming:seltimings
        };
        fetch(BASE_URL+'/bookturf/savebooking',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:this.props.cred.tokenid,
                bookingdtls:bookingdtls
            })})
         .then((res) => res.json())
         .then( async (data) => {
            if(data.Status==="Success")
            {
                this.alertboxcontentfunc("User - SLOT BOOKING",data.Message);
                document.getElementById("alertboxhit").click();
                await this.props.fetchturfs();
            }
            else
            {
                this.alertboxcontentfunc("User - SLOT BOOKING",data.Message);
                document.getElementById("alertboxhit").click();
            }
         })
         .catch((err) => {
            this.alertboxcontentfunc("User - SLOT BOOKING","Error in processing the data");
            document.getElementById("alertboxhit").click();
         });
    }

    render() {
        return (
            <>
            <button type="button" id="slottable" className="btn btn-info btn-lg" style={{ display: "none"}} data-toggle="modal" data-target="#myModalST">BookSlot</button>
            <div id="myModalST" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title"  style={{textAlign:'center',fontWeight:"bold"}}>Confirm Slot Booking</h4>
                </div>
                <div className="modal-body">               
                    <table className="table center-align-table">
                    <tbody>
                            <tr>
                                <td style={{textAlign:'center',fontWeight:"bold"}}>Time</td>
                                <td style={{textAlign:'center',fontWeight:"bold"}}>Price</td>
                            </tr>
                            {this.props.tabledtls.map((obj,i)=>
                            <>
                            <tr key={i}>
                                <td style={{textAlign:'center'}}>{obj.time}</td>
                                <td style={{textAlign:'center'}}>{obj.price}</td>
                            </tr>
                            </>
                            )}
                    </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(event)=>this.confirmbooking()}>Submit</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            </>
            );   
    }
  }

export default BookSlotsTable;