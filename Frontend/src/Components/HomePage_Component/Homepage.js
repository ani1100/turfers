import React, { useState } from 'react'
import Header1 from '../Header_Component/Header1';
import ViewAlias from '../Signup_Component/ViewAlias';
import Description1 from './Description1';
import CredPage from '../Signup_Component/CredPage';

function HomePage(props) {
    const[admindtls]=useState({
        title:"Admin",
        desc:"Manage turf at admin level",
        button:"Manage"
    });
    const[userdtls]=useState({
        title:"User",
        desc:"Manage turf at user level",
        button:"Book"
    });
    
    return (
        <>
        <div className="backcolor">
            <Header1 cred={props.cred}/>
            <Description1/>
            <br/>
            <ViewAlias dtls={admindtls} setcred={props.setcred}/>
            <br/>
            <ViewAlias dtls={userdtls} setcred={props.setcred}/>
            <CredPage cred={props.cred} setcred={props.setcred} setcontents={props.setcontents} setview={props.setview}/>
            <h1 className="clear1">&nbsp;</h1>
        </div>
        </>
        );
}
export default HomePage;