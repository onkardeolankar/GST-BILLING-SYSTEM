import { Route, Router, Routes } from "react-router-dom";
import BankDetails from "./BankDetails";
import Dashboard from "./Dashboard";
import EditInvoice from "./EditInvoice";
import Form from "./Form";
import Home from "./Home";
import InvoiceDetails from "./InvoiceDetails";
import Login from "./Login";
import Navbar from "./Navbar";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./Profile";
import Userdata from "./Userdata";

 const Routers = () => {
    return (
        <>
        {/* <Navbar  title="form"/> */}
        <Navbar/>
        <Routes>
        
             {/* <Route path="/sign-up"  element={<><PrivateRoutes>  <Form name="John" contact="965XXXXXXX" city="Jaipur" heading="form"/></PrivateRoutes></>} /> */}
            <Route path="/login" element={<><PrivateRoutes>  <Login  title="Login" /></PrivateRoutes> </>} />
            <Route path="/input" element={<><PrivateRoutes>  <Userdata/></PrivateRoutes></>} />
            <Route path="/dashboard" element={<><PrivateRoutes>  <Dashboard/></PrivateRoutes></>} />
            <Route path="/bankdetails" element={<><PrivateRoutes>  <BankDetails/></PrivateRoutes></>} />
            <Route path="/invoicedetails" element={<><PrivateRoutes>  <InvoiceDetails/></PrivateRoutes></>} />
            <Route path="/" element={<> <PrivateRoutes><Home/></PrivateRoutes></>} />
            <Route path="/profile" element={<> <PrivateRoutes><Profile/></PrivateRoutes></>} />
            <Route path="/edit" element={<> <PrivateRoutes><EditInvoice/></PrivateRoutes></>} />
        </Routes>
        </>
    );
  };
  export const BEFORE_LOGIN_ROUTES = [ "/login"];
  export default Routers;
