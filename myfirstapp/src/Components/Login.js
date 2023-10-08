import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from '../redux/actions/authAction';
import { login } from '../service/auth';
import Userdata from './Userdata';

export default function Login(props) {const dispatch=useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onChange = (event, type) => {
    switch (type) {
      case "email":
        setEmail(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
             break;
      default:
        break;
    }
  };

  const validate = () => {
    let valid = true;
    if (password.length < 8) {
      valid = false;
      setPasswordError("Password must be at least 8 character.");
    } else if (password.length > 16) {
      valid = false;
      setPasswordError("Password can be more then 16 character.");
    } else setPasswordError("");

    return valid;
  };
  const onLogin = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      setLoading(true);

      const data = {
        email,
        password,
      };
      const res = await login(data);

      console.log(">>>>>>>>>>>>>>>>>>>>>>login res", res);
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem("authData", JSON.stringify(res?.data?.data));
        localStorage.setItem("token", JSON.stringify(res.data?.data?.token));
        dispatch(loginAction(res.data.data));
        console.log(res.data.data);
        navigate("/dashboard");
      } else {
        alert(res.data.message ?? "Something went wrong");
      }

      setLoading(false);
    }
  };
  return (
    <>
    <center><h2>{props.title}</h2></center>
    <div className='container'>
        <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(event) => onChange(event, "email")} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(event) => onChange(event, "password")} id="exampleInputPassword1"/>
  </div>
  <button type="submit" onClick={onLogin} className="btn btn-primary">Submit</button>
</form>
    </div>
    <br/>
    {/* <Userdata user_data={users}/> */}
    </>
  )
}

