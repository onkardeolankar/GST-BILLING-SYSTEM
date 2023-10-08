import React, { useEffect, useState } from 'react'
import { getProfileDetails } from '../service/profile'
import img from "./../images/img.png";

export default function Profile() {
  const[company,setCompany]=useState("");
  const[gst,setGst]=useState("");
  const[address1,setAddress1]=useState("");
  const[address2,setAddress2]=useState("");
  const[pan,setPan]=useState("");
  const[contact,setContact]=useState("");
  let profobj={};
         
  const profiledata=async()=>{
    const res=await getProfileDetails();
    (res.data.data).forEach(element => {
      profobj={...profobj, ...element};
    });
    console.log("element=",profobj);
    console.log(res.data.data);
    setCompany(profobj.company);
    setAddress1(profobj.address_1);
   setAddress2(profobj.address_2);
   setContact(profobj.contact);
   setGst(profobj.gst_in)
   setPan(profobj.pan)
    
    
 

 }
 useEffect(()=>{
   profiledata();
 },[])
    

    
  return (
    // <div>Profile</div>
    <>
    <div className='container-fluid mt-2 d-flex flex-column justify-content-center align-middle'>
      <div className='cont1 container text-center p-0'>
      <img src={img} className="img-fluid" alt="..."/>
    {/* <div className='cont2 container-fluid text-start  m-0 d-flex flex-column justify-content-center bg-secondary text-white'>
      <div className='fs-5 fw-bold'>Company:&nbsp;&nbsp;{company}</div>
      <div className='fs-5 fw-bold'>Gstin:&nbsp;&nbsp;</div>
      <div className='fs-5 fw-bold'>Address</div>
      <div className='fs-5 fw-bold'>PAN</div>
      <div className='fs-5 fw-bold'>Contact</div>
      
    </div> */}
    <div class="container-fluid bg-secondary text-white">
  <div class="row p-3">
    <div class="col text-start m-0 p-0">
    <div className='fs-5 fw-bold'>Company:</div>
      <div className='fs-5 fw-bold'>Gstin:</div>
      <div className='fs-5 fw-bold'>Address:</div>
      <div className='fs-5 fw-bold'>PAN:</div>
      <div className='fs-5 fw-bold'>Contact:</div>
    </div>
    <div class="col text-start m-0 p-0" >
    <div className='fs-5 fw-bold'>{company}</div>
    <div className='fs-5 fw-bold'>{gst}</div>
    <div className='fs-5 fw-bold'>{address1},{address2}</div>
    <div className='fs-5 fw-bold'>{pan}</div>
    <div className='fs-5 fw-bold'>{contact}</div>
    </div>
   
  </div>
</div>
      </div>

    </div>
 
    </>
  )
}

