import React from 'react'

class AvailableTurfObj extends React.Component {
    constructor(props) {
        super(props);
        this.alertboxcontentfunc=this.alertboxcontentfunc.bind(this);
        this.clickslot=this.clickslot.bind(this);
        this.bookturf=this.bookturf.bind(this);
        this.state={
           slotstyleempty: {width:"50px",height:"20px",textAlign:'center'}
        };   
    }

    alertboxcontentfunc(title,body){
        this.props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    clickslot(obj)
    {
        this.props.selectslot(obj);
    }

    async bookturf(obj)
    {
        await this.props.settabledtlsempty(obj.turfid,obj.schdate);
        for(var i=0;i<obj.turftiming.length;i++)
        {
            if(obj.turftiming[i].slotstyle.backgroundColor==="green")
            {
                var temp={time:obj.turftiming[i].time,price:obj.turftiming[i].price};
                await this.props.settabledtls(temp);
            }
        }
        if(this.props.tabledtls.length===0)
        {
            this.alertboxcontentfunc("User - SLOT BOOKING","Please select a Slot For Booking");
            document.getElementById("alertboxhit").click();
        }
        else
        {
            document.getElementById("slottable").click();
        }  
    }

    render() {
        return (
            <>
            <div>
            <div className="bookdtls1">
                {this.props.turfobj.turfname}
            </div>
            <div className="bookdtls2">
                <table className="table center-align-table">
                    <tbody>
                        <tr>
                            {this.props.turfobj.turftiming.slice(0,6).map((turft,i) =>
                            <>
                                <td key={i}>
                                    <div style={turft.slotstyle} onClick={(event) => this.clickslot(turft)}>{turft.time}</div>
                                </td>
                            </>
                            )}
                            {this.props.turfobj.turftiming.length<6 &&
                                <>
                                    {[...Array(6-this.props.turfobj.turftiming.length).keys()].map((obj,i) =>
                                    <>
                                    <td key={i}>
                                        <div style={this.state.slotstyleempty}></div>
                                    </td>
                                    </>)}
                                </>
                            } 
                        </tr>
                        <tr>
                            {this.props.turfobj.turftiming.slice(6,12).map((turft,i) =>
                            <>
                                <td key={i}>
                                    <div style={turft.slotstyle} onClick={(event) => this.clickslot(turft)}>{turft.time}</div>
                                </td>
                            </>
                            )}
                        </tr>
                        <tr>
                            {this.props.turfobj.turftiming.slice(12,18).map((turft,i) =>
                            <>
                                <td key={i}>
                                    <div style={turft.slotstyle} onClick={(event) => this.clickslot(turft)}>{turft.time}</div>
                                </td>
                            </>
                            )}
                        </tr>
                        <tr>
                            {this.props.turfobj.turftiming.slice(18,24).map((turft,i) =>
                            <>
                                <td key={i}>
                                    <div style={turft.slotstyle} onClick={(event) => this.clickslot(turft)}>{turft.time}</div>
                                </td>
                            </>
                            )}
                        </tr>
                </tbody>
            </table>
            </div>
            <div className="bookdtls3">
            <button type="button" className="btn" onClick={(event)=>this.bookturf(this.props.turfobj)}>Book</button>
            </div> 
            <h5 className="clear2">&nbsp;</h5>
            </div>
            </>
            );   
    }
  }

export default AvailableTurfObj;