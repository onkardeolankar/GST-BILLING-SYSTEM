import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addPODetails, editPODetails } from "../service/poDetails";

export default function BankDetails(props) {
    const location=useLocation();
    // console.log("location>>",location.pathname);
    const authData = useSelector((state) => state.authReducer);
    const prev_data=useSelector((state)=>state.poReducer);
    // console.log(prev_data.date_of_issue)
    const navigate=useNavigate();
  
    const[po_number,setPONumber]=useState(location.pathname==="/edit"?prev_data.po_number:"");
    const[gstin,setGSTIn]=useState(location.pathname==="/edit"?prev_data.gstin:"");
    const[date_of_issue,setIssueDate]=useState(location.pathname=="/edit"?(prev_data.date_of_issue).slice(0,10):"");
    const[poc,setPoc]=useState(location.pathname==="/edit"?prev_data.poc:"");
    const[address,setAddress]=useState(location.pathname==="/edit"?prev_data.address:"");
    const[trainer_name,setTrainerName]=useState(location.pathname==="/edit"?prev_data.trainer_name:"");
    const[trainer_delivery_location,setDeliveryLocation]=useState(location.pathname==="/edit"?prev_data.trainer_delivery_location:"");
    const[technology,setTechnology]=useState(location.pathname==="/edit"?prev_data.technology:"");
    const[training_dates,setTrainingDates]=useState(location.pathname==="/edit"?(prev_data.training_dates).slice(0,10):"");
    const[total_duration,setTotalDuration]=useState(location.pathname==="/edit"?prev_data.total_duration:"");
    const[client,setClient]=useState(location.pathname==="/edit"?prev_data.client:"");
    const[ph,setPh]=useState(location.pathname==="/edit"?prev_data.ph:"");
    
    

    const onChange = (event, type) => {
        switch (type) {
          case "po":
            setPONumber(event.target.value);
            break;
          case "gst":
            setGSTIn(event.target.value);
            break;
    
          case "issueDate":
            setIssueDate(event.target.value);
            break;
    
          case "poc":
            setPoc(event.target.value);
            break;
          case "address":
            setAddress(event.target.value);
            break;
          case "trainer":
            setTrainerName(event.target.value);
            break;
          case "location":
            setDeliveryLocation(event.target.value);
            break;
          case "technology":
            setTechnology(event.target.value);
            break;
          case "dates":
            setTrainingDates(event.target.value);
            break;
          case "client":
            setClient(event.target.value);
            break;
          case "ph":
            setPh(event.target.value);
            break;
          case "duration":
            setTotalDuration(event.target.value);
            break;
        }
        
    };
  
    
    
   
    const onAddPODetails = async (e) => {
        e.preventDefault();
    
        const poData = {
          po_number,
          gstin,
          date_of_issue,
          poc,
          ph,
          address,
          trainer_name,
          user_id: authData._id,
          trainer_delivery_location,
          technology,
          training_dates,
          total_duration,
          client,
          
        };
        const confirm=window.confirm("Are you sure?");
        if(confirm){

            const res = await addPODetails(poData);
            console.log(">>>>>>>>>>>>>>>>>>>>>>res", res);
            if (res.data.success) {
              alert(res.data.message);
                navigate("/dashboard");
            } else {
              alert(res.data.message ?? "Something went wrong.");
            }
        }
      };
      const edit=async(e)=>{
        // console.log("prev data",prev_data);
        e.preventDefault();
    
        const poData = {
        user_id: prev_data.user_id,
          po_number,
          gstin,
          date_of_issue,
          poc,
          ph,
          address,
          trainer_name,
          trainer_delivery_location,
          technology,
          training_dates,
          total_duration,
          client
          
        };
        console.log(poData);
        const confirm=window.confirm("Are you sure?");
        if(confirm){

            const res = await editPODetails(poData);
            console.log(">>>>>>>>>>>>>>>>>>>>>>res", res);
            if (res.data.success) {
              alert(res.data.message);
                navigate("/dashboard");
            } else {
              alert(res.data.message ?? "Something went wrong.");
            }

      }
    }
    

  return (
    <>
    
      <div className="container border border-secondary bg-light">
        <div className="text-center fs-3 fs-bold ">PO Details</div>
        <form>
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor="client">
              Client:
            </label>
            <input type="text" onChange={(event) => onChange(event, "client")} id="client" value={client} className="form-control" required />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example1">
              PO Number:
            </label>
            <input type="text" onChange={(event) => onChange(event, "po")} id="form4Example1" value={po_number} className="form-control" required/>
          </div>
       

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example2">
              GSTIN:
            </label>
            <input type="text"  id="form4Example2" value={gstin} onChange={(event) => onChange(event, "gst")}  className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="ph">
              Phone:
            </label>
            <input type="number"  id="ph" value={ph} onChange={(event) => onChange(event, "ph")}  className="form-control" required/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example3">
              Date of Issue:
            </label>
            <input type="date" onChange={(event) => onChange(event, "issueDate")} id="form4Example3" value={date_of_issue} className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"  htmlFor="form4Example4">
              Poc:
            </label>
            <input type="text" id="form4Example4" value={poc} onChange={(event) => onChange(event, "poc")} className="form-control" required/>
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="floatingTextarea2">Address</label>
            <textarea
              className="form-control"
              value={address}
              onChange={(event) => onChange(event, "address")}
              placeholder=""
              id="floatingTextarea2"
              required
            ></textarea>
          </div>

          {/* <!-- Message input --> */}

          {/* <!-- Checkbox --> */}

          {/* <!-- Submit button --> */}
        </form>
      </div>

      {/* additional details */}

      <div className="container border border-secondary mt-5 bg-light">
        <div className="text-center fs-3 fs-bold ">Description</div>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="trainer">
            Name of the trainer:
            </label>
            <input type="text" id="trainer" required value={trainer_name} onChange={(event) => onChange(event, "trainer")} className="form-control" />
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Training delivery location">
            Training delivery location:
            </label>
            <input type="text" value={trainer_delivery_location} required id="Training delivery location" onChange={(event) => onChange(event, "location")} className="form-control" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Technology">
            Technology:
            </label>
            <input type="text" id="Technology" value={technology} required onChange={(event) => onChange(event, "technology")} className="form-control" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Training dates">
            Training dates:
            </label>
            <input type="date" id="Training dates" value={training_dates} required onChange={(event) => onChange(event, "dates")} className="form-control"  />
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="floatingTextarea2">Total duration</label>
            <input type="number" id="Total duration" value={total_duration} required className="form-control" onChange={(event) => onChange(event, "duration")} placeholder="In Days"/>
          </div>

          {/* <!-- Message input --> */}

          {/* <!-- Checkbox --> */}

          {/* <!-- Submit button --> */}
        </form>
      </div>
      <div className="container my-3">

          <button type="submit" onClick={location.pathname=="/bankdetails"?onAddPODetails:edit} className="btn btn-primary btn-block">
          {location.pathname=="/bankdetails"?"Add details":"Edit Details"} 
          </button>
      </div>
    </>
  );
}
