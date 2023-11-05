import React from 'react'

class UserProfileDtls extends React.Component {
    constructor(props) {
        super(props);
        this.usernamechange=this.usernamechange.bind(this);
        this.phonenochange=this.phonenochange.bind(this);
        this.emailidchange=this.emailidchange.bind(this);
        this.emailidblur=this.emailidblur.bind(this);
        this.validateEmail=this.validateEmail.bind(this);
        this.alertboxcontentfunc=this.alertboxcontentfunc.bind(this);
        this.state={
        };   
    }

    async alertboxcontentfunc(title,body){
        await this.props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    async usernamechange(event)
    {
        await this.props.usernamechangeprofile(event.target.value);
    }

    async phonenochange(event)
    {
        if(event.target.value.length>10)
        {
            return;
        }
        for(var i=0;i<event.target.value.length;i++)
        {
            if(!(String(event.target.value).charCodeAt(i)>=48 && String(event.target.value).charCodeAt(i)<=57))
            {
                return; 
            }
        }
        await this.props.phonenochangeprofile(event.target.value);
    }

    async emailidchange(event)
    {
        await this.props.emailidchangeprofile(event.target.value);
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async emailidblur()
    {
        if(this.validateEmail(this.props.profile.emailid)===false)
        {
            await this.props.emailidchangeprofile("");
            this.alertboxcontentfunc("USER - PROFILE","Invalid Email ID");
            document.getElementById("alertboxhit").click();
        }
    }

    render() {
        return (
            <>
               
                <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input type="text" className="form-control" id="username" value={this.props.profile.username} onChange={this.usernamechange}/>
                </div>

                <div className="form-group">
                        <label htmlFor="phoneno">Phone No:</label>
                        <input type="text" className="form-control" id="phoneno" value={this.props.profile.phoneno} onChange={this.phonenochange}/>
                </div>

                <div className="form-group">
                        <label htmlFor="emailid">Email ID:</label>
                        <input type="text" className="form-control" id="emailid" value={this.props.profile.emailid} onChange={this.emailidchange} onBlur={this.emailidblur}/>
                </div>

            </>
            );   
    }
  }

export default UserProfileDtls;