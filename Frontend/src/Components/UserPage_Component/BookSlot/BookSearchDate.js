import React from 'react'

class BookSearchDate extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        };   
    }

    render() {
        return (
            <> 
            <div>
            <div style={{textAlign:"center"}}>
                <input type="date" className="btn" value={this.props.bookingdate} onChange={this.props.datechangefunc}/>
                <button type="button" className="btn" onClick={this.props.fetchturfs}><span className="glyphicon glyphicon-search"></span></button>
            </div>
            </div>
            </>
            );   
    }
  }

export default BookSearchDate;