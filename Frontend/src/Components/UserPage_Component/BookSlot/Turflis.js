import React from 'react'
import AvailableTurfObj from './AvailableTurfObj';

class Turflis extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        };   
    }

    render() {
        return (
            <>
            <div>
                {this.props.fetchdtlsturf.Status==="NA" && 
                <div> <br/> <h4 style={{textAlign:"center"}}>{this.props.fetchdtlsturf.Message}</h4></div>}

                {this.props.fetchdtlsturf.Status==="A" && 
                <div>
                    <h5 className="clear2">&nbsp;</h5>
                    {this.props.fetchdtlsturf.turflis.map((obj,i) => <AvailableTurfObj turfobj={obj} key={i} selectslot={this.props.selectslot} setalertboxcontent={this.props.setalertboxcontent} tabledtls={this.props.tabledtls} settabledtls={this.props.settabledtls} settabledtlsempty={this.props.settabledtlsempty}/>)}
                </div>
                }
            </div>
            </>
            );   
    }
  }

export default Turflis;