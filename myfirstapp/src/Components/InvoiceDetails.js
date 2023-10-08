import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { ToWords } from 'to-words';
import { getProfileDetails } from '../service/profile';


export default function InvoiceDetails() {
  const toWords = new ToWords();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const d = new Date();
  const prev_data=useSelector((state)=>state.poReducer);
  console.log(prev_data);
  let date=(d.getDate()<10?"0"+d.getDate():d.getDate());
  let month=(d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1);
  let year=d.getFullYear();
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
    <>
  
<div className='container text-center p-3 '>
    <button className='btn btn-success' onClick={handlePrint}>Generate PDF</button>
</div>
<hr/>  
<div className='print-section container-fluid m-auto' ref={componentRef}>

<div className='text-center fw-bold  mt-4'><u>REGex Software -- INVOICE</u></div>
<div className="container border border-dark border-top-0 border-bottom-0 mt-0 w-auto">
  <div className="row row-cols-2 ">
    <div className="col-6 border border-dark p-1 "><div className='fw-bolder '>INVOICE No:  {prev_data.invoice_number}</div></div>
    <div className="col-6 border border-dark p-1 "><div className='fw-bolder '>INVOICE DATE:  {`${date}.${month}.${year}`}</div></div>
    <div className="col  p-1 fs-bold border border-dark">
        <div className='fw-bold '>GSTIN:<div className='d-inline mx-3 text-muted'>{gst}</div></div>
        <div className='fw-bold '>M/s:<div className='d-inline mx-3 text-muted'>{company}</div></div>
        <div className='fw-bold '>Address:<div className='d-inline mx-3 text-muted'>{address1}<br/><div className=' mx-6 text-muted d-inline'>{address2}</div></div></div>
        <div className='fw-bold  '>Contact:<div className='d-inline mx-3 text-muted'>{contact}</div></div>
        <div className='fw-bold  '>PAN:<div className='d-inline mx-3 text-muted'>{pan}</div></div>
    </div>
    <div className="col  p-1 fs-bold border border-dark">
        <div className='fw-bold '>GSTIN:<div className='d-inline mx-3 text-muted'>{prev_data.gstin}</div></div>
        <div className='fw-bold '>CLIENT:<div className='d-inline mx-3 text-muted'>{prev_data.client}</div></div>
        <div className='fw-bold '>Address:<div className='d-inline mx-3 text-muted'>{prev_data.address}</div></div>
        <div className='fw-bold '>PH:<div className='d-inline mx-3 text-muted'>{prev_data.ph}</div></div>
        <div className='fw-bold '>POC:<div className='d-inline mx-3 text-muted'>{prev_data.poc}</div></div>
        <div className='fw-bold '>PO Number:<div className='d-inline mx-3 text-muted'>{prev_data.po_number}</div></div>
        <div className='fw-bold '>Date of PO:<div className='d-inline mx-3 text-muted'>{prev_data.date_of_issue.slice(0,10)}</div></div>
        </div>
  </div>
</div> 


<div className="container border border-dark border-top-0 border-bottom-0 mt-3 w-auto">
  <div className="row row-cols-1 ">
    <div className="col border border-dark  fs-bold"><div className='fw-bolder '>Bank Details</div></div>
    <div className="col border border-dark  fs-bold">
        <div className=' '>Beneficiary Name as per Bank A/c:</div>
        <div className=' '>Account Number -</div>
        <div className=' '>IFSC Code:</div>
        <div className=' '>Bank Address:</div>
    </div>
    
  </div>
</div> 

<div className="container  border border-dark border-top-0 border-bottom-0 mt-3 w-auto fs-xs-5 ">
  <div className="row row-cols-2 row-cols-lg-5">
    <div className="col-5 border border-dark  fw-bold p-2"><div className='  text-center'><u>Description</u></div></div>
    <div className="col-3 border border-dark  fw-bold p-2"><div className='  text-center'>Cost/Day(INR)</div></div>
    <div className="col-1 border border-dark  fw-bold p-2"><div className='  text-center'>Cal</div></div>
    <div className="col-1 border border-dark  fw-bold p-2"><div className='  text-center'>Rate (%)</div></div>
    <div className="col-2 border border-dark  fw-bold p-2"><div className='  text-center'>Final Amount</div></div>   
  </div>
  <div className="row row-cols-2 row-cols-lg-5">
    <div className="col-5 border border-dark p-1 fw-bold ">
        <div className=' '>Trainer name:<div className='d-inline mx-3 text-muted'>{prev_data.trainer_name}</div></div>
        <div className=' '>Technology:<div className='d-inline mx-3 text-muted'>{prev_data.technology}</div></div>
        <div className=' '>Total duration:<div className='d-inline mx-3 text-muted'>{prev_data.total_duration}</div></div>
        <div className=' '>Training dates:<div className='d-inline mx-3 text-muted'>{prev_data.training_dates.slice(0,10)}</div></div>
    </div>
    <div className="col-3 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center">800</div>
    <div className="col-1 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center p-2">800 x {prev_data.total_duration}</div>
    <div className="col-1 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center"></div>
    <div className="col-2 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center"><span className="material-symbols-outlined pt-1">
currency_rupee
</span>{800*prev_data.total_duration}</div>   
  </div>
  <div className="row row-cols-2 row-cols-lg-5">
    <div className="col-5 border border-dark p-1 fw-bold ">GST Rate</div>
    <div className="col-3 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center">18%</div>
    <div className="col-2 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center"><span className="material-symbols-outlined pt-1">
currency_rupee
</span>{800*prev_data.total_duration*18/100}</div>   
  </div>
  <div className="row row-cols-2 row-cols-lg-5">
    <div className="col-5 border border-dark p-1 fw-bold ">Total Payment in this tenure</div>
    <div className="col-3 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1"></div>
    <div className="col-2 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center"><span className="material-symbols-outlined pt-1">
currency_rupee
</span>{800*prev_data.total_duration*(118/100)}</div>   
  </div>
  <div className="row row-cols-2 row-cols-lg-5">
    <div className="col-5 border border-dark p-1 fw-bold ">Payment to be Paid</div>
    <div className="col-3 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1"></div>
    <div className="col-1 border border-dark p-1"></div>
    <div className="col-2 border border-dark p-1 fw-bold  d-flex justify-content-center align-items-center"><span className="material-symbols-outlined pt-1">
currency_rupee
</span>{800*prev_data.total_duration*(118/100)}/-</div>   
  </div>
</div>
<div className="container-sm  mt-1">
  <div className="row row-cols-1 ">
    <div className="col fw-normal ">Amount in words : {toWords.convert(800*prev_data.total_duration*(118/100), { currency: true })}</div> 
  </div>
</div> 
<div className='container-sm d-flex flex-column text-end w-auto mt-5 fw-normal'>
  <div>Authority Signature( Name of a Person )</div>
  <div>REGex Software Services</div>
</div>
<div className='container-sm d-flex flex-column text-center w-auto mt-4 fw-normal '>
  <div>Offices : Jaipur || Pune</div>
  <div>Website: <a href='https://www.regexsoftware.com' className='text-primary' target={"_blank"}>www.regexsoftware.com</a></div>
</div>

  </div> 


    </>
  )
}
