import React from 'react'
import {useState } from "react";
import Alert from '../Alert_Component/Alert';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Url';


function CredPage(props) {
    const [alertmsg,setalertmsg]=useState();
    const [alertshow,setalertshow]=useState(false);
    const [type,settype]=useState();
    
    let reglogchange=async (obj)=>
    {
        if(obj!==props.cred.logintype)
        {
            await props.setcred({
                type:props.cred.type,
                userid:"",
                password:"",
                logintype:obj,
                tokenid:""
            });
        } 
    }

    let passwordchange = async(event) => {
        await props.setcred(previousState => {
            return { ...previousState,password:event.target.value}
        });
    };

    let useridchange = async(event) => {
        await props.setcred(previousState => {
            return { ...previousState,userid:event.target.value}
        });
    };

    let successalert = async (msg) => {
        setalertshow(true);
        setalertmsg(msg);
        settype("success");
        setTimeout(() => {
            setalertshow(false);
        }, 2000);
    }

    let erroralert = (msg) => {
        setalertshow(true);
        setalertmsg(msg);
        settype("error");
        setTimeout(() => {
            setalertshow(false);
        }, 2000);
    }

    let register = () => {
        if(props.cred.userid===null || props.cred.userid==="" || props.cred.password===null || props.cred.password==="")
        {
            erroralert("Please Enter Full Details");
            return;
        }
        setalertshow(false);
        var url;
        if(props.cred.type==="Admin")
        {
            url=BASE_URL+"/adminlogin/register";
        }
        else
        {
            url=BASE_URL+"/userlogin/register";
        }
        fetch(url,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "credentials":{"userid":props.cred.userid,
                            "password":props.cred.password}
            })})
         .then((res) => res.json())
         .then((data) => {    
            if(data.Status==="Success")
            {
                successalert(data.Message);
            }
            else
            {
                erroralert(data.Message);
            }
         })
         .catch((err) => {
            erroralert("Error in processing the data");
         });
    };


    let login = async () => {
        if(props.cred.userid===null || props.cred.userid==="" || props.cred.password===null || props.cred.password==="")
        {
            erroralert("Please Enter Full Details");
            return;
        }
        setalertshow(false);
        var url;
        if(props.cred.type==="Admin")
        {
            url=BASE_URL+"/adminlogin/login";
        }
        else
        {
            url=BASE_URL+"/userlogin/login";
        }
        try
        {
            const response=await fetch(url,{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "credentials":{"userid":props.cred.userid,
                                "password":props.cred.password}
            })});
            const data = await response.json();
            if(data.Status==="Success")
            {
                successalert(data.Message);
                document.getElementById("clickbutton").click();
                if(props.cred.type==="Admin")
                {
                    await props.setcred(previousState => {
                        return {...previousState,password:"",tokenid:data.tokenid}
                    });
                    await props.setcontents(["INFORMATION","SCHEDULE","HISTORY"]);
                    await props.setview("Homepage"); 
                    document.getElementById("adminscreen").click();
                }
                else
                {
                    await props.setcred(previousState => {
                        return {...previousState,password:"",tokenid:data.tokenid}
                    });
                    await props.setcontents(["PROFILE","BOOK SLOT","USER HISTORY"]);
                    await props.setview("Homepage");
                    document.getElementById("userscreen").click();
                }
            }
            else
            {
                erroralert(data.Message);
            }
        }
        catch(err)
        {
            erroralert("Error in processing the data");
        }
    };

    return (
        <>
            <Link to="/admin">
                <button type="button" id="adminscreen" className="btn btn-info btn-lg" style={{ display: "none" }}>Cred</button>
            </Link>
            <Link to="/user">
                <button type="button" id="userscreen" className="btn btn-info btn-lg" style={{ display: "none" }}>Cred</button>
            </Link>
            <button type="button" id="clickbutton" className="btn btn-info btn-lg" style={{ display: "none" }} data-toggle="modal" data-target="#myModal">Cred</button>
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">{props.cred.type}</h4>
                        </div>
                        <div className="modal-body text-center">
                            {alertshow===true && <Alert alertmsg={alertmsg} type={type}/>}
                            <div>   
                                <button type="button" className="btn" onClick={event => reglogchange('Register')}>Register</button> &nbsp;
                                <button type="button" className="btn" onClick={event => reglogchange('Login')}>Login</button>
                            </div>
                            <br/><br/>
                            <div>
                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <label className="col-sm-2 col-form-label">User ID</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" value={props.cred.userid} onChange={useridchange}/>
                                    </div>
                                    <div className="col-sm-2"></div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <label className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-5">
                                        <input type="password" className="form-control" value={props.cred.password} onChange={passwordchange}/>
                                    </div>
                                    <div className="col-sm-2"></div>
                                </div>
                            </div>
                            <br/>
                            {(props.cred.logintype==="Register") && <button type="button" className="btn" onClick={register}>Register</button>} 
                            {(props.cred.logintype==="Login") && <button type="button" className="btn" onClick={login}>Login</button>} 
                        </div> 
                    </div>
                </div>
            </div> 
        </>
        );
}
export default CredPage;