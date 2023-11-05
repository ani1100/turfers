import React from 'react'
import AlertBox from '../Alert_Component/AlertBox';
import Header1 from '../Header_Component/Header1';
import UserPage_HomeView from './User_HomePage/UserPage_HomeView';
import SubHeaders from '../Header_Component/SubHeaders';
import UserProfile from './UserProfile/UserProfile';
import BookSlotPage from './BookSlot/bookslotpage';
import { BASE_URL } from '../../Url';
import UserHistoryDtls from './UserHistory/UserHistoryDtls';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        //Alert Box
        this.setalertboxcontent = this.setalertboxcontent.bind(this);
        
        //Profile
        this.usernamechangeprofile = this.usernamechangeprofile.bind(this);
        this.phonenochangeprofile = this.phonenochangeprofile.bind(this);
        this.emailidchangeprofile = this.emailidchangeprofile.bind(this);
        this.setprofile = this.setprofile.bind(this);
        this.setsaveeditbutton = this.setsaveeditbutton.bind(this);
        
        //Book
        this.setbookingdate=this.setbookingdate.bind(this);
        this.datechangefunc=this.datechangefunc.bind(this);
        this.bookingobject=this.bookingobject.bind(this);
        this.fetchturfs=this.fetchturfs.bind(this);
        this.selectslot=this.selectslot.bind(this);

        //Profile
        this.userhistorydtlschangefunc=this.userhistorydtlschangefunc.bind(this);
    
        this.state={
            alertboxcontent:{},
            saveeditbutton:"",
            profile:{},
            bookingdate:"",
            fetchdtlsturf:{},
            userhistorydtls:[]
        };   
    }

    static getDerivedStateFromProps(props, state) {
        if(props.cred.userid==="")
        {
                window.location.href = "/";
        }
        return {};
    }

    setalertboxcontent(obj){
        this.setState({alertboxcontent:obj});
    };

    usernamechangeprofile(val)
    {
        this.setState(
            previousState => {
                return { ...previousState, profile : {
                    ...previousState.profile, username:val
                }}}); 
    }

    phonenochangeprofile(val)
    {
        this.setState(
            previousState => {
                return { ...previousState, profile : {
                    ...previousState.profile, phoneno:val
                }}}); 
    }

    emailidchangeprofile(val)
    {
        this.setState(
            previousState => {
                return { ...previousState, profile : {
                    ...previousState.profile, emailid:val
                }}}); 
    }

    setprofile(obj){
        this.setState({profile:obj});
    };

    setsaveeditbutton(obj){
        this.setState(
            previousState => {
                return { ...previousState, saveeditbutton:obj}
            });
    };

    setbookingdate(obj)
    {
        this.setState({bookingdate:obj});
    }

    datechangefunc(event)
    {
        this.setState({bookingdate:event.target.value});
    }

    userhistorydtlschangefunc(obj)
    { 
        this.setState({userhistorydtls:obj});
    }

    bookingobject()
    {   
        var obj={};
        var date=new Date();
        var month1 = String(date.getMonth()+1);
        month1=(month1.length===1)?"0".concat(month1):month1;
        var day1 = String(date.getDate());
        day1=(day1.length===1)?"0".concat(day1):day1;
        var sysdate=String(date.getFullYear()).concat("-").concat(month1).concat("-").concat(day1);
        if(this.state.bookingdate<sysdate)
        {
            return false;
        }
        else if(this.state.bookingdate===sysdate)
        {
            var hour=String(date.getHours()+1).concat(":00");
            obj["bookingdate"]=this.state.bookingdate;
            obj["bookingtime"]=hour;
        }
        else
        {
            obj["bookingdate"]=this.state.bookingdate;
            obj["bookingtime"]="00:00";
        }
        return obj;
    }

    async fetchturfs()
    {
        var obj=this.bookingobject();
        if(obj===false)
        {
            var resp={"Status":"NA","Message":"Booking Not Possible On Past Dates"};
            this.setState({fetchdtlsturf:resp});
            return;
        }
        fetch(BASE_URL+'/bookturf/fetchavailableturfs',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(obj)})
            .then((res) => res.json())
            .then( async (data) => {
                if(data.Status==="NA")
                {
                    this.setState({fetchdtlsturf:data});
                }
                else
                {
                    var slotstyle= {width:"50px",height:"20px",backgroundColor:"white",textAlign:'center'};
                    for(var i=0;i<data.turflis.length;i++)
                    {
                        for(var j=0;j<data.turflis[i].turftiming.length;j++)
                        {
                            data.turflis[i].turftiming[j].slotstyle=slotstyle;
                        }
                    }
                    this.setState({fetchdtlsturf:data});
                }
            })
            .catch((err) => {
                this.setalertboxcontent({title:"User - SLOT BOOKING",body:"Error in processing the data"});
                document.getElementById("alertboxhit").click();
                this.props.setview("Homepage");
            });
    }

    async selectslot(obj)
    {
        var slotstyle1= {width:"50px",height:"20px",backgroundColor:"white",textAlign:'center'};
        var slotstyle2= {width:"50px",height:"20px",backgroundColor:"green",textAlign:'center'};
        var newlist=await this.state.fetchdtlsturf.turflis.map(item1 => {
                    return {...item1,turftiming: item1.turftiming.map(item => {
                    if (item===obj) {   
                        if(item.slotstyle.backgroundColor==="white")
                        {   
                            return { ...item, slotstyle:slotstyle2}
                        }
                        else
                        {
                            return { ...item, slotstyle:slotstyle1}
                        }
                    }
                    return item;
                }
            )}
        });
        this.setState(
            previousState => {
                return { ...previousState, fetchdtlsturf : {
                    ...previousState.fetchdtlsturf,turflis:newlist
                }
        }}); 
    }

    render() {
        return (
            <div className="backcolor">
                <AlertBox alertboxcontent={this.state.alertboxcontent}/>
                <Header1 cred={this.props.cred} setview={this.props.setview}/>
                <SubHeaders userhistorydtlschangefunc={this.userhistorydtlschangefunc} contents={this.props.contents} fetchturfs={this.fetchturfs} setbookingdate={this.setbookingdate} cred={this.props.cred} setview={this.props.setview} setalertboxcontent={this.setalertboxcontent} setprofile={this.setprofile} setsaveeditbutton={this.setsaveeditbutton}/>
                {this.props.view==="Homepage" && <UserPage_HomeView/>}
                {this.props.view==="PROFILE" && <UserProfile cred={this.props.cred} profile={this.state.profile} saveeditbutton={this.state.saveeditbutton} setalertboxcontent={this.setalertboxcontent} usernamechangeprofile={this.usernamechangeprofile} phonenochangeprofile={this.phonenochangeprofile} emailidchangeprofile={this.emailidchangeprofile} setsaveeditbutton={this.setsaveeditbutton}/>}
                {this.props.view==="BOOK SLOT" && <BookSlotPage selectslot={this.selectslot} bookingdate={this.state.bookingdate} datechangefunc={this.datechangefunc} fetchturfs={this.fetchturfs} fetchdtlsturf={this.state.fetchdtlsturf} cred={this.props.cred} setalertboxcontent={this.setalertboxcontent}/>}    
                {this.props.view==="USER HISTORY" && <UserHistoryDtls userhistorydtls={this.state.userhistorydtls}/>}    
                <h1 className="clear1">&nbsp;</h1>
            </div>
            );   
    }
  }

export default UserPage;