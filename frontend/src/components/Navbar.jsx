import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLogoutMutation } from '../slices/donorsApiSlice';
import { logout } from '../slices/authSlice';
import { BloodRequestContext } from '../screens/Otherbloodrequestsscreen';
import { Badge } from 'react-bootstrap';


const logoStyle = {
  height: "30px",
  width: "30px"
};

const dropdownItemStyle = {
  color: "black", // Default text color
  transition: "color 0.3s", // Smooth transition on hover
};

const dropdownItemHoverStyle = {
  color: "orangered", // Text color on hover
};

function Navbar() {
  const { donorInfo } =useSelector((state) => state.auth);
  const [isVisionHovered, setIsVisionHovered] = useState(false);
  const [isTeamMembersHovered, setIsTeamMembersHovered] = useState(false);
  const [isContactUsHovered, setIsContactUsHovered] = useState(false);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    // Display a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };
  

  const handleMouseEnterVision = () => {
    setIsVisionHovered(true);
  };

  const handleMouseLeaveVision = () => {
    setIsVisionHovered(false);
  };

  const handleMouseEnterTeamMembers = () => {
    setIsTeamMembersHovered(true);
  };

  const handleMouseLeaveTeamMembers = () => {
    setIsTeamMembersHovered(false);
  };

  const handleMouseEnterContactUs = () => {
    setIsContactUsHovered(true);
  };

  const handleMouseLeaveContactUs = () => {
    setIsContactUsHovered(false);
  };

  //const isAdminDonor = donorInfo && donorInfo.email === 'shazzad1907100@stud.kuet.ac.bd'; // Replace 'specific@admin.email' with the actual admin email

  const isAdmin = donorInfo && donorInfo.isAdmin;

    // Use the context
    const totalBloodRequestCount = useContext(BloodRequestContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
      <Link to='/' className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h1 className="h3 text-danger">
          <img src="/images/logo.png" alt="Logo" className="mr-2" style={logoStyle}/>
          Dream
        </h1>
      </Link>
      <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to='/' className="nav-item nav-link">Home</Link>
          {isAdmin ? (
                 <li className="nav-item dropdown">
                 {/* Admin Facility Options */}
                 <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   Admin Options
                 </a>
                 <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                   <li>
                     <Link to="/admin/donorInfo" className="dropdown-item">Donors Managment</Link>
                     <Link to="/admin/doctor/all" className="dropdown-item">Doctors Mangment</Link>
                     <Link to="/admin/appointment" className="dropdown-item">Appointment Managment</Link>
                   </li>
                   {/* Add more admin options as needed */}
                 </ul>
               </li>
          ) : donorInfo ? (
            <Link to="/blood-req" className="nav-item nav-link">Create Blood Request</Link>
          ) : !donorInfo?(
            <Link to="/public-blood-req" className="nav-item nav-link">Create Blood Request</Link>
          ) : null
        }
          {
            donorInfo && !isAdmin ? (
              <Link to="/all-donors" className="nav-item nav-link" >Search Donor</Link>
            ):null
          }
          {/*<a href="#goals" className="nav-item nav-link">Goals</a>
          <a href="#why-donate" className="nav-item nav-link">Why Donate Blood</a>
          <a href="#eligibility" className="nav-item nav-link">Pre-Donation</a>*/}
          {
             !isAdmin ? (
              <Link to="/doctors" className="nav-item nav-link" >Doctor Appointment</Link>
            ):null
          }


          <a href="" className="nav-item nav-link">Events And News</a>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="aboutUsDropdown" role a="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              About Us
            </a>
            <ul className="dropdown-menu" aria-labelledby="aboutUsDropdown">
              <li>
                <a
                  className="dropdown-item"
                  href=" "
                  style={isVisionHovered ? dropdownItemHoverStyle : dropdownItemStyle}
                  onMouseEnter={handleMouseEnterVision}
                  onMouseLeave={handleMouseLeaveVision}
                >
                  Our Vision
                </a>
              </li>
              <li>
                <Link
                  to="/members"
                  className="dropdown-item"
                  style={isTeamMembersHovered ? dropdownItemHoverStyle : dropdownItemStyle}
                  onMouseEnter={handleMouseEnterTeamMembers}
                  onMouseLeave={handleMouseLeaveTeamMembers}
                >
                  Our Team Members
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href=" "
                  style={isContactUsHovered ? dropdownItemHoverStyle : dropdownItemStyle}
                  onMouseEnter={handleMouseEnterContactUs}
                  onMouseLeave={handleMouseLeaveContactUs}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </li>
                {donorInfo ? (
                 <div className="btn-group">

                {!isAdmin?(
                <button
                  type="button"
                  className="btn btn-white rounded-0 py-4 px-lg-5" // Adjust padding as needed
                >
                  <Link to="/other-blood-reqs">
                  <i className="fa fa-bell"></i>
                   {totalBloodRequestCount > 0 && (
                    <span className="badge bg-danger ms-1">{totalBloodRequestCount}</span>
                   )} 
                 
                    </Link>
              </button>):null}

              


                    <button
                    type="button"
                    className="btn btn-dark rounded-0 py-4 px-lg-5 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                   >
                 
                   <i className="fa fa-user"></i>
                   </button>
                  <ul className="dropdown-menu">
                    <li>
                    <Link to="/profile" className="dropdown-item">
                         Profile
                    </Link>

                    {!isAdmin ?(
                    <li>
                    <Link to = "/pending-req" className="dropdown-item">
                      Show Requests
                   </Link>
                   </li>
                  ):null}


                 </li>
                  <li>
                  <button
                  className="dropdown-item"
                  onClick={logoutHandler}
                  >
                  Sign Out
                 </button>
              </li>
           </ul>
         </div>
           ) : (
            <Link to="/login" className="btn btn-dark rounded-0 py-4 px-lg-5">
                Sign In<i className="fa fa-arrow-right ms-3"></i>
          </Link>
           )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
