import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { BEFORE_LOGIN_ROUTES } from "./routes";

const PrivateRoutes = ({ children }) => {
    const prev_data=useSelector((state)=>state.poReducer);
    console.log("privateroutes data",prev_data);
  const location = useLocation();
  let returnData;

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const route = location?.pathname;
   console.log(location);
  console.log(">>>>>>>>>>>>>>>>>.route", route);
 

  if (isLoggedIn()) {
    console.log(isLoggedIn());
    if (route === "/") {
      returnData = <Navigate to="/dashboard" replace />;
    } else if (!BEFORE_LOGIN_ROUTES.includes(route)) {
      returnData = children;
    }
   
     else {
      returnData = <Navigate to="/dashboard" replace />;
    }
    if(route==="/edit"&& prev_data.user_id===undefined){
        console.log("inside edit route");
        returnData = <Navigate to="/dashboard" replace />;
    }
    if(route==="/invoicedetails"&& prev_data.user_id===undefined){
        console.log("inside edit route");
        returnData = <Navigate to="/dashboard" replace />;
    }
    
  } else if (BEFORE_LOGIN_ROUTES.includes(route)) {
    returnData = children;
  } 
  else {
    returnData = <Navigate to="/login"/>;
  }

  return returnData;
};

export default PrivateRoutes;
