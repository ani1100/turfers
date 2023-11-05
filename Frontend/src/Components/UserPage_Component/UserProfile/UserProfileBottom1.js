import React from 'react'
import { BASE_URL } from '../../../Url';

class UserProfileBottom1 extends React.Component {
    constructor(props) {
        super(props);
        this.alertboxcontentfunc=this.alertboxcontentfunc.bind(this);
        this.validateinput=this.validateinput.bind(this);
        this.saveprofile=this.saveprofile.bind(this);
        this.editprofile=this.editprofile.bind(this);
        this.state={
        };   
    }

    alertboxcontentfunc(title,body){
        this.props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    validateinput()
    {
        if(this.props.profile.username===""||this.props.profile.emailid===""||this.props.profile.phoneno===""||this.props.profile.phoneno.length!==10)
        {
            return false;   
        }
        return true;
    }

    saveprofile()
    {
        if(this.validateinput()===false)
        {
            this.alertboxcontentfunc("User - PROFILE","Please Fill in Entire Details");
            document.getElementById("alertboxhit").click();
            return;
        }
        fetch(BASE_URL+'/userprofile/save',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:this.props.cred.tokenid,
                profile:this.props.profile
            })})
         .then((res) => res.json())
         .then( async (data) => {
            if(data.Status==="Success")
            {
                this.props.setsaveeditbutton("Edit");
                this.alertboxcontentfunc("User - PROFILE",data.Message);
                document.getElementById("alertboxhit").click();
            }
            else
            {
                this.alertboxcontentfunc("User - PROFILE",data.Message);
                document.getElementById("alertboxhit").click();
            }
         })
         .catch((err) => {       
            this.alertboxcontentfunc("User - PROFILE","Error in processing the data");
            document.getElementById("alertboxhit").click(); 
         });
    }

    editprofile()
    {
        if(this.validateinput()===false)
        {
            this.alertboxcontentfunc("User - PROFILE","Please Fill in Entire Details");
            document.getElementById("alertboxhit").click();
            return;
        }
        fetch(BASE_URL+'/userprofile/edit',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:this.props.cred.tokenid,
                profile:this.props.profile
            })})
         .then((res) => res.json())
         .then( async (data) => {
            if(data.Status==="Success")
            {
                this.alertboxcontentfunc("User - PROFILE",data.Message);
                document.getElementById("alertboxhit").click();
            }
            else
            {
                this.alertboxcontentfunc("User - PROFILE",data.Message);
                document.getElementById("alertboxhit").click();
            }
         })
         .catch((err) => {   
            this.alertboxcontentfunc("User - PROFILE","Error in processing the data");
            document.getElementById("alertboxhit").click();    
         });
    }

    render() {
        return (
            <>
            <div style={{textAlign:"right"}}>
                {this.props.saveeditbutton==="Save" && <button type="button" className="btn" onClick={this.saveprofile}>Save</button>}
                {this.props.saveeditbutton==="Edit" && <button type="button" className="btn" onClick={this.editprofile}>Edit</button>}
            </div>
            </>
            );   
    }
  }

export default UserProfileBottom1;