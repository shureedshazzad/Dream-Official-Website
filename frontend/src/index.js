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
import Allbloodreqofadonorscreen from './screens/Allbloodreqofadonorscreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Donorinfoscreen from './screens/Adminscreen/Donorinfoscreen.jsx';
import Donoreditscreen from './screens/Adminscreen/Donoreditscreen.jsx';
import Otherbloodrequestsscreen from './screens/Otherbloodrequestsscreen.jsx';
import Alldonors from './screens/Alldonors.jsx';
import Publicblooddonationreqscreen from './screens/Publicblooddonationreqscreen.jsx';
import BloodDonationForSpecificDonors from './screens/BloodDonationForSpecificDonors.jsx';
import Createdoctorscreen from './screens/Adminscreen/Createdoctorscreen.jsx';
import Showalldoctorscreen from './screens/Adminscreen/Showalldoctorscreen.jsx';
import Doctoreditscreen from './screens/Adminscreen/Doctoreditscreen.jsx';
import Alldoctors from './screens/Alldoctors.jsx';
import Appointmentscreen from './screens/Appointmentscreen.jsx';
import Allappointmentscreen from './screens/Adminscreen/Allappointmentscreen.jsx';
import Appointmentinfoscreen from './screens/Adminscreen/Appointmentinfoscreen.jsx';
import Createeeventscreen from './screens/Adminscreen/Createeeventscreen.jsx';
import Showallevents from './screens/Showallevents.jsx';
import Showeventbyid from './screens/Showeventbyid.jsx';
import Eventinfo from './screens/Adminscreen/Eventinfo.jsx';
import EventEdit from './screens/Adminscreen/EventEdit.jsx';
import MedicalCenterInfo from './screens/MedicalCenterInfo.jsx';
import Visionscreen from './screens/Visionscreen.jsx';



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<Homescreen/>}/> 
      <Route path="/members" element={<Teammemberscreen/>}/>
      <Route path="/login"   element={<Loginscreen/>}/>
      <Route path="/register" element={<Registerscreen/>}/>   
      <Route path="/private-blood-req" element={<Blooddonationreqscreen/>}/>
      <Route path="/profile" element={<Profilescreen/>}/>
      <Route path='/all-req' element={<Allbloodreqofadonorscreen />}/>
      <Route path='/other-blood-reqs' element={<Otherbloodrequestsscreen/>}/>
      <Route path="/all-donors" element={<Alldonors/>} />
      <Route path="/public-blood-req" element={<Publicblooddonationreqscreen/>}/>
      <Route path="/:id/create_send" element={<BloodDonationForSpecificDonors/>}/>
      <Route path="/doctors" element={<Alldoctors/>}/>
      <Route path="/doctors/appointment/:id" element={<Appointmentscreen/>}/>
      <Route path="/events/all" element={<Showallevents/>}/>
      <Route path="/events/all/:id" element={<Showeventbyid/>}/>
      <Route path="/medical" element={<MedicalCenterInfo/>}/>
      <Route path="/vision" element={<Visionscreen/>}/>



      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/donorInfo' element={<Donorinfoscreen/>}/>
        <Route path='/admin/donor/:id/edit'  element={<Donoreditscreen/>}/>
        <Route path='/admin/doctor/create' element={<Createdoctorscreen/>}/>
        <Route path='/admin/doctor/all' element={<Showalldoctorscreen/>}/>
        <Route path='/admin/doctor/edit/:id' element={<Doctoreditscreen/>}/>
        <Route path="/admin/appointment" element={<Allappointmentscreen/>}/>
        <Route path="/admin/appointment/:id" element={<Appointmentinfoscreen/>}/>
        <Route path="/admin/event/create" element={<Createeeventscreen/>}/>
        <Route path="/admin/event/all" element={<Eventinfo/>}/>
        <Route path="/admin/event/all/:id" element={<EventEdit/>}/>

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
