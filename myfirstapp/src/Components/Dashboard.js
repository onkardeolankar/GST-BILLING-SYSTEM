import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../redux/actions/authAction';
import Navbar from './Navbar';
import POList from './POList';

export default function Dashboard() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onLogout = () => {
        if (window.confirm("Are you sure?")) {
          localStorage.clear();
          dispatch(logoutAction());
          navigate("/login");
        }
      };
  return (
    <>
    

  <div className='container text-center'>


    <button type="button" className="btn btn-outline-success ms-3 mt-4" onClick={() => onLogout()}>Log Out</button>
  </div>
   <POList/>
    </>
    
  )
}
