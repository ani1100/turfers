import React from 'react'

class UserHistoryDtls extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        };   
    }

    render() {
        return (
            <>
            <div className="infodtls">
                <div style={{textAlign:"center"}}>
                    <h3>User History</h3>
                </div>
                <br/><br/>
                <div>
                    <table className="table centeralign table-bordered text-center">
                        <thead>
                            <tr style={{backgroundColor:"#FFF0F5"}}>
                                <td>Turf Name</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Price</td>
                                <td>Status</td>
                            </tr>
                        </thead>  
                        <tbody>
                                {this.props.userhistorydtls.map((obj,i)=> (
                                    <tr Key={i} style={{backgroundColor:"ghostwhite"}}>
                                        <td>{obj.turfname}</td>
                                        <td>{obj.schdate}</td>
                                        <td>{obj.time}</td>
                                        <td>{obj.price}</td>
                                        <td>{obj.status}</td>
                                    </tr>
                                ))} 
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            );   
    }
  }

export default UserHistoryDtls;