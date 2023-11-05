import React from 'react'
import BookSearchDate from './BookSearchDate';
import Turflis from './Turflis';
import BookSlotsTable from './BookSlotsTable';

class BookSlotPage extends React.Component {
    constructor(props) {
        super(props);
        this.settabledtls=this.settabledtls.bind(this);
        this.settabledtlsempty=this.settabledtlsempty.bind(this);
        this.state={
            tabledtls:[],
            tableturfid:"",
            tableschdate:""
        };   
    }

    settabledtls(obj,val1,val2)
    {
        this.setState({tabledtls:[...this.state.tabledtls,obj]});
    }

    settabledtlsempty(val1,val2)
    {
        this.setState({tabledtls:[],tableturfid:val1,tableschdate:val2});
    }

    render() {
        return (
            <>
            <div className="infodtls">
                <BookSlotsTable tabledtls={this.state.tabledtls} tableturfid={this.state.tableturfid} cred={this.props.cred} fetchturfs={this.props.fetchturfs} tableschdate={this.state.tableschdate} setalertboxcontent={this.props.setalertboxcontent}/>
                <BookSearchDate bookingdate={this.props.bookingdate} datechangefunc={this.props.datechangefunc} fetchturfs={this.props.fetchturfs}/>   
                <Turflis selectslot={this.props.selectslot} fetchdtlsturf={this.props.fetchdtlsturf} setalertboxcontent={this.props.setalertboxcontent} tabledtls={this.state.tabledtls} settabledtls={this.settabledtls} settabledtlsempty={this.settabledtlsempty}/>
            </div>
            </>
            );   
    }
  }

export default BookSlotPage;