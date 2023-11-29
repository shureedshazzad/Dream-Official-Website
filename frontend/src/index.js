import React from 'react';
import ReactDOM from 'react-dom/client';

import{
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store.js';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homescreen from './screens/Homescreen';
import Teammemberscreen from './screens/Teammemberscreen.jsx';
import Loginscreen from './screens/Loginscreen.jsx';
import Registerscreen from './screens/Registerscreen.jsx';
import Blooddonationreqscreen from './screens/Blooddonationreqscreen.jsx';
import Profilescreen from './screens/Profilescreen.jsx';
import Pendingbloodreqscreen from './screens/Pendingbloodreqscreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Donorinfoscreen from './screens/Adminscreen/Donorinfoscreen.jsx';
import Donoreditscreen from './screens/Adminscreen/Donoreditscreen.jsx';
import Editbloodrequsetscreen from './screens/Editbloodrequsetscreen.jsx';
import Otherbloodrequestsscreen from './screens/Otherbloodrequestsscreen.jsx';
import Alldonors from './screens/Alldonors.jsx';
import Publicblooddonationreqscreen from './screens/Publicblooddonationreqscreen.jsx';
import BloodDonationForSpecificDonors from './screens/BloodDonationForSpecificDonors.jsx';



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<Homescreen/>}/> 
      <Route path="/members" element={<Teammemberscreen/>}/>
      <Route path="/login"   element={<Loginscreen/>}/>
      <Route path="/register" element={<Registerscreen/>}/>   
      <Route path="/blood-req" element={<Blooddonationreqscreen/>}/>
      <Route path="/profile" element={<Profilescreen/>}/>
      <Route path='/pending-req' element={<Pendingbloodreqscreen/>}/>
      <Route path='/blood-req/:requestId' element={<Editbloodrequsetscreen/>}/>
      <Route path='/other-blood-reqs' element={<Otherbloodrequestsscreen/>}/>
      <Route path="/all-donors" element={<Alldonors/>} />
      <Route path="/public-blood-req" element={<Publicblooddonationreqscreen/>}/>
      <Route path="/:id/create_send" element={<BloodDonationForSpecificDonors/>}/>
      

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/donorInfo' element={<Donorinfoscreen/>}/>
        <Route path='/admin/donor/:id/edit'  element={<Donoreditscreen/>}/>
      </Route>

    </Route>



  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
