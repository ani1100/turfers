import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState } from "react";
import HomePage from './Components/HomePage_Component/Homepage';
import AdminPage from './Components/AdminPage_Component/AdminPage';
import UserPage from './Components/UserPage_Component/UserPage';


function App() {
  const [cred,setcred]=useState({
    type:"",
    userid:"",
    password:"",
    logintype:"",
    tokenid:""
  });
  const [view,setview]=useState("");
  const [contents,setcontents]=useState([]);
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage cred={cred} setcred={setcred} setcontents={setcontents} setview={setview}/>}>
          </Route>
          <Route exact path="admin" element={<AdminPage cred={cred} contents={contents} view={view} setview={setview}/>}>
          </Route>
          <Route exact path="user" element={<UserPage cred={cred} contents={contents} view={view} setview={setview}/>}>
          </Route>
        </Routes>
      </BrowserRouter>  
    </>
  );
}

export default App;
