import React, { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectedPOAction } from '../redux/actions/poActions';
import { searchData } from '../redux/actions/userActions';

import { deletePODetails, getPODetails } from '../service/poDetails';

export default function POList() {
    const dispatch=useDispatch();
    const [selected_data,setSelectedData]=useState({});
    const [nomore,setNoMore]=useState(true);
    const [offset,setOffSet]=useState(1);
    const navigate=useNavigate();
    let res={};
    let PO_array=[];
   
    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const searchedData = useSelector((state) => state.userReducer);
    // let po_number="";
    const [po_number,setPONumber]=useState("");
    const [disabled,setDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
    
    // console.log("h",searchedData.search_input);
    // let search_input=searchedData.search_input;
    const search_input=useMemo(()=>{
        return searchedData.search_input;
    },[searchedData.search_input])
    console.log("search inp>>>", search_input);

    // const [searchText, setSearchText] = useState(search_input);
    const getPOData = async () => {
     setLoading(true);
      res = await getPODetails();
      if (res.data.success) {
        setLoading(false);
         PO_array=res.data.data;
         setUsers(PO_array); 
         setFilteredData(PO_array);

       } else {
         alert(res.data.message ?? "Something went wrong.");
         
       }
       console.log("users=",users);       
   };
   useEffect(() => {
    getPOData();
  },[]);

    const radio=(po)=>{

        console.log(po.user_id);
        setSelectedData(po);
        // po_number=e.target.value;
        setPONumber((po.user_id));
        setDisabled(false);
      }
    
      const myComponent = {
        
        height: '400px',
        
        overflow: 'scroll'
    };
     
       
      const usersJsxData =filteredData && filteredData.map((po) => {
        return (
            
            <tr key={po.user_id} id={po.po_number} >
            <th scope="row">
            <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id={po.user_id}   onClick={()=>radio(po)}/>
 
</div>
            </th>
            <td className='p-0'><label htmlFor={po.user_id } className="d-block p-2" >{po.client}</label></td>
            <td className='p-0'><label htmlFor={po.user_id } className="d-block p-2" >{po.po_number}</label></td>
            {/* <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.gstin}</label></td> */}
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.date_of_issue.slice(0,10)}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.poc}</label></td>
            {/* <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.address}</label></td> */}
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.ph}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.trainer_name}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.trainer_delivery_location}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.technology}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.training_dates.slice(0,10)}</label></td>
            <td className='p-0 '><label htmlFor={po.user_id} className="d-block p-2">{po.total_duration} Days</label> </td>
        </tr>
        );
      });

     


      useEffect(() => {
        
        console.log(">>>>>> useEffect searchText 2  ", search_input);
    
        const filteredUsers =users&& users.filter((po) => {
          return po.po_number.includes(search_input);
        });
        console.log(filteredUsers);
        setFilteredData(filteredUsers);
      }, [search_input]);

      
     const deleteInvoice=async()=>{
        console.log(po_number);
        const confirm=window.confirm("Are you sure?");
        if(confirm){
      const res=await deletePODetails(selected_data.user_id);
      document.getElementById(selected_data.po_number).style="display:none";
      // const data=await getPOData(2,offset);
      console.log(res);
      if (res.data.success) {
        
        // setUsers(PO_array);
        // setFilteredData(PO_array);
        alert(res.data.message);
          navigate("/dashboard");
          setDisabled(true);
      } else {
        alert(res.data.message ?? "Something went wrong.");
      }
    }
      
     }
     

      const editInvoice=()=>{
        dispatch(selectedPOAction(selected_data));
        console.log("moving to edit,data=",selected_data)
        navigate("/edit");
      }

      const fetchData=async()=>{
        console.log("hello");
    
        const dataFromServer=await getPODetails(2,offset);
        console.log("datafrom server",dataFromServer)
       
        setUsers([...users,...dataFromServer.data.data]);
        console.log(users);
        setFilteredData([...filteredData,...dataFromServer.data.data]);
        console.log("filtered data=",filteredData)
        console.log("length=",dataFromServer.data.data.length);
        setOffSet(offset+1);
        if(dataFromServer.data.data.length===0 || dataFromServer.data.data.length<2){
          setNoMore(false);
        }
        // setFilteredData(...users,...dataFromServer.data.data);

      };
      const raiseInvoice=()=>{
        dispatch(selectedPOAction(selected_data));
        navigate("/invoicedetails")
      }
      console.log("jsx=",usersJsxData);

  return (
    
    <>
    <div className='container-fluid mt-3 text-center'>
<button type="button" className="btn btn-info text-dark" onClick={()=>navigate("/bankdetails")}>Add Invoice</button>
<button type="button" className="btn btn-outline-dark mx-3" disabled={disabled} onClick={deleteInvoice}>Delete Invoice</button>
<button type="button" className="btn btn-outline-primary " disabled={disabled} onClick={editInvoice}>Edit Invoice</button>
    <button type="button" className="btn btn-outline-secondary ms-3 " disabled={disabled}  onClick={raiseInvoice}>Raise Invoice</button>
</div>

    
    <div className='container text-center'>
        

    <h3 className='d-inline'>PO LIST&nbsp;</h3>  {loading?<div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>:""}
   
    

    </div>
    <hr/>
  <div className='container-fluid'>

    <div style={{ height: '200px' }}>
      <div style={myComponent}>

    {/* <InfiniteScroll
  dataLength={users.length} //This is important field to render the next data
  next={fetchData}
  hasMore={nomore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }

> */}
<div className='table-responsive'>

    <table className="table table-hover">
      

  <thead className='table-dark'>
    <tr>
      <th scope="col" className='p-2'>#</th>
      <th scope="col" className='p-2'>Client</th>
      <th scope="col" className='p-2'>PO Number</th>
      {/* <th scope="col" className='p-2'>GSTIN</th> */}
      <th scope="col" className='p-2'>Date of Issue</th>
      <th scope="col" className='p-2'>Poc</th>
      {/* <th scope="col" className='p-2'>Address</th> */}
      <th scope="col" className='p-2'>Phone</th>
      <th scope="col" className='p-2'>Name of the trainer</th>
      <th scope="col" className='p-2'>Training delivery location</th>
      <th scope="col" className='p-2'>Technology</th>
      <th scope="col" className='p-2'>Training dates</th>
      <th scope="col" className='p-2'>Total duration</th>
      
    </tr>
  </thead>
      
  
  <tbody>
    
    

                   
  
{usersJsxData.length>0?usersJsxData:<tr><td className='fs-5 fw-bolder text-center m-auto'>No details found!</td></tr>}
</tbody>
 
</table>
</div>
{/* </InfiniteScroll> */}
      </div>
    </div>

  </div>



 
  
    </>
  )
}
