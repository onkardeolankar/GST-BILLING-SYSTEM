
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { SEARCHED_DATA } from '../redux/actions/actions';
import { searchData } from '../redux/actions/userActions';

// const [searched,setsearched]=useState(null);




export default function Navbar(props) {
  const user_data=JSON.parse(localStorage.getItem("authData"));
  const dispatch=useDispatch();
  const [search_input,setSearchInput]=useState("");
  const navigate=useNavigate();

   const searched_data=(event)=>{
    setSearchInput(event.target.value);
    // console.log(search_input);
 

}

   
useEffect(() => {
  const searchedData={search_input};
    
  dispatch(searchData(searchedData));
console.log("navbar search input>>>",search_input);
},[search_input]);



const clicked=(type)=>{
  console.log("signup");
  navigate(type);
}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        {/* <a className="nav-link" href='/'   onClick={()=>navigate("/")}    >Signup</a>{" "} */}
         <Link className="nav-link border border-light rounded"  to="/dashboard">{localStorage.getItem("token")?`HELLO ${user_data.name.split(" ")[0].toString().toUpperCase()}`:"Sign Up"}</Link>{" "}
        </li>
        <li className="nav-item">
          {/* <nav className="nav-link" ><Link to="login">Login</Link> |{" "}</nav> */}
          <Link className="nav-link"  to="/profile">Company Profile</Link>{" "}
          {/* <a className="nav-link"  href='/login'   onClick={()=>navigate("/login")}   >Login</a>{" "} */}
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" onChange={searched_data} value={search_input} placeholder="Enter PO Number" aria-label="Search"/>

      </form>
    </div>
  </div>
</nav>
  )
}
