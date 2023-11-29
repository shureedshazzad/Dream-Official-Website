import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTopButton from './components/BackToTopButton'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <BackToTopButton/>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App