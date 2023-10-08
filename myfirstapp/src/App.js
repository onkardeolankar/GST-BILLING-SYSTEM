
import './App.css';
// import Adminform from './Components/Adminform';
import Form from './Components/Form';
import { Routes, Route, Link, BrowserRouter, useNavigate } from "react-router-dom";
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import { reducers } from './redux/reducers';
import thunk from 'redux-thunk';
import Routers from './Components/routes';

// import Userform from './Components/Userform';

function App() {
  const store = createStore(reducers,applyMiddleware(thunk));
  return (
<>   
<Provider store={store}>

  {/* <Navbar title="form"/> */}
  <BrowserRouter>
      {/* <Routes>
        <Route path="/"  element={<Form name="John" contact="965XXXXXXX" city="Jaipur" heading="form"/>} />
        <Route path="login" element={<Login  title="Login" />} />
      </Routes> */}
      <Routers/>
 </BrowserRouter>
</Provider>

{/* <Form name="John" contact="965XXXXXXX" city="Jaipur" heading="form"/> */}
{/* <Login title="Login"/> */}
{/* <Userform name="John" contact="965XXXXXXX" city="Jaipur" heading="UserForm" />
<Adminform name="John" contact="965XXXXXXX" city="Jaipur" heading="AdminForm"/> */}
</>
  );
}

export default App;
