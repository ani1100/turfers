import React from 'react'
import UserProfileDtls from './UserProfileDtls';
import UserProfileBottom1 from './UserProfileBottom1';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        };   
    }

    render() {
        return (
            <>
            <div className="infodtls">
                <UserProfileDtls profile={this.props.profile} usernamechangeprofile={this.props.usernamechangeprofile} phonenochangeprofile={this.props.phonenochangeprofile} emailidchangeprofile={this.props.emailidchangeprofile} setalertboxcontent={this.props.setalertboxcontent}/>
                <UserProfileBottom1 saveeditbutton={this.props.saveeditbutton} cred={this.props.cred} profile={this.props.profile} setalertboxcontent={this.props.setalertboxcontent} setsaveeditbutton={this.props.setsaveeditbutton}/>
            </div>
            </>
            );   
    }
  }

export default UserProfile;