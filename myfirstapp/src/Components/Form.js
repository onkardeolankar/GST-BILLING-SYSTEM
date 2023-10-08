import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '.././index.css'
import { signUp } from '../service/auth';
import Navbar from './Navbar';
export default function Form(props) {

  
    const navigate=useNavigate();  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");
    const [email_help,setEmailHelp]=useState("We'll never share your email with anyone else.");
    const [emai_helpcss,setEmailHelpCss]=useState("");
    const [pass_help,setPassHelp]=useState("");
    const [text1_css,settext1Css]=useState("small");
    const [text2_css,settext2Css]=useState("small");
    const [text3_css,settext3Css]=useState("small");
    const [text4_css,settext4Css]=useState("small");
    const [pass_helpcss,setPassHelpCss]=useState("");
    let alltrue=false;
    let detail_error=false;
    const onChange = (event, type) => {
      switch (type) {
        case "name":
          setName(event.target.value);
  
          break;
        case "email":
          setEmail(event.target.value);
          break;
  
        case "phoneNo":
          setPhoneNo(event.target.value);
          break;
  
        case "password":
          setPassword(event.target.value);
        case "city":
          setCity(event.target.value);
      }
    };
    
    const details=()=>{
      // const username=String(document.getElementById("username").value);
      // const email=String(document.getElementById('exampleInputEmail1').value);
      // const password=String(document.getElementById('exampleInputPassword1').value);
   

        


     console.log("inside details");
      let namearray=name.split(" ");
    
      namearray.push(namearray.join(""),name);
      console.log(namearray);
      for(let i of namearray){
        if(password.includes(i)){
          detail_error=true;
          setPassHelpCss("passhelpcss");
          setPassHelp("Password must not include username!");
        }
    }
    if(!email.includes("gmail.com")){
      detail_error=true;
       // email_help.innerText="Sorry,you are not authorized";
       setEmailHelp("Sorry,you are not authorized");
       setEmailHelpCss("small");
       // email_help.style="color:red";
   }
    
   


    }
  
    const [disabled,setDisable]=useState(true);

    const passwordvalidation=(event)=>{
      
    
      let text=String(event.target.value);
      console.log(text);
      let textarr=text.split("");
      let capital=false;
      let special=false;
      let number=false;
      console.log(textarr);
      console.log(text.length);
      if(text.length>=8){
          settext1Css("green");
      }
      else{
          settext1Css("small");
      }
     for(let i=0;i<text.length;i++){
      if(text.charCodeAt(i)>=65 && text.charCodeAt(i)<=90){
          capital=true;
      }
      if(text[i]>=0 && text[i]<=9){
          number=true;
      }
      if((text.charCodeAt(i)>=33 && text.charCodeAt(i)<=9) || (text.charCodeAt(i)>=58 && text.charCodeAt(i)<=64) || (text.charCodeAt(i)>=91 && text.charCodeAt(i)<=96) || (text.charCodeAt(i)>=123 && text.charCodeAt(i)<=127)){
          special=true;
      }
     }
      if(capital){
        settext2Css("green");
      }
      else{
          settext2Css("small");
      }
      if(number){
          settext4Css("green");
      }
      else{
          settext4Css("small");
      }
      if(special){
      
          settext3Css("green");
      }
      else{
          settext3Css("small");
      }
      if(text.length>=8 && capital && number && special){
          alltrue=true;
      }
      if(alltrue){
        setDisable(false);
          console.log(typeof(disabled),disabled);
         
      }
      else{
        setDisable(true);
      }


    }

    const onSignUp = async (e) => {
      e.preventDefault();
     const details= await details();
      if(!details){

        const userData = {
          name,
          email,
          password,
          phone_no:phoneNo,
          city
        };
        console.log(">>>>>>>>>>>>>>>>>>>>>>", userData);
        const res = await signUp(userData);
        console.log(">>>>>>>>>>>>>>>>>>>>>>res", res);
        if (res.data.success) {
          alert(res.data.message);
          navigate("/login");
        } else {
          alert(res.data.message ?? "Something went wrong.");
        }
      }
  
     
      
    };

    

  return (
    <>
    

    <div className="container">
        <h1 id='heading'>{props.heading}</h1>
        <form action="#">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder={props.name} onChange={(event) => onChange(event, "name")} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" aria-describedby="cityhelp" onChange={(event) => onChange(event, "city")} placeholder={props.city} />
            </div>
            <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input type="number" className="form-control" id="number" aria-describedby="numberhelp" onChange={(event) => onChange(event, "phoneNo")} placeholder={props.contact} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => onChange(event, "email")} required/>
                <div id="emailHelp" className={`form-text ${emai_helpcss}`}>{email_help}</div>
            </div>
            <div className="mb-3 password">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onKeyUp={passwordvalidation} type="password" className="form-control" id="exampleInputPassword1" onChange={(event) => onChange(event, "password")} required />
                <h4 className={pass_helpcss}>
                  {pass_help}
                </h4>
                <span id="text1" className= {`form-text ${text1_css}`}>
                    Must be 8-20 characters long.&nbsp;
                  </span>
                  <span id="text2" className={`form-text ${text2_css}`}>
                    must have 1 capital letter.&nbsp;
                  </span>
                  <span id="text3" className={`form-text ${text3_css}`}>
                    must have 1 special character.&nbsp;
                  </span>
                  <span id="text4" className={`form-text ${text4_css}`}>
                    must have a numeric value
                  </span>
            </div>
          
            <button onClick={onSignUp}   type="submit" className="btn btn-primary" disabled={disabled} >Submit</button>
        </form>
    </div>
    </>
  )
}
