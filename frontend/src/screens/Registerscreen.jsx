
//phoneNumber
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/donorsApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';



function Registerscreen() {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [donations, setDonations] = useState(0);
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [currentLocation,setCurrentLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const currentDate = new Date().toISOString().split('T')[0];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { donorInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (donorInfo) {
      navigate(redirect);
    }
  }, [donorInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  
  


  
  const validatePassword = (input) => {//password pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$]).{6,}$/;
    if (!passwordPattern.test(input)) {
      setPasswordError(
      
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  



  const submitHandler = async (e) => {
    e.preventDefault();
      // Your existing email pattern check
  const kuetEmailPattern = /^[a-z]+(18|19|20|21|22)(0[1-9]|1[0-6])(\d{3})@stud\.kuet\.ac\.bd$/;
  const specificEmail = 'shureedshazzad534@gmail.com';

  if (!(kuetEmailPattern.test(email) || email === specificEmail)) {
    toast.error('Invalid Email');
    return;
  } 
  else if (!/^(01[3-9]\d{8}|018\d{8})/.test(phoneNumber)) {
      //Check the phone number against the regular expression
      toast.error('Invalid Mobile Number')
      return;
   }
    else if (!validatePassword(password)) {
    toast.error('Password should be least 6 characters in length and  conatins at leaat one uppercase letter (A-Z), at least one lowercase letter (a-z), at least one special character from the set !@#$');
    return;
  } 
  else if (password !== confirmPassword) {//password and confirm password must be same
      toast.error('Passwords do not match');
      return;
    } 
    else {
      try {
        setLoading(true);
        const res = await register({
          name,
          dept,
          batch,
          email,
          phoneNumber,
          bloodType,
          donations,
          lastDonationDate,
          currentLocation,
          password,
        }).unwrap();

          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success('Registration Successful');
      } 
      catch (err) {
        toast.error(err?.data?.message || err.error, { autoClose: 5000 });
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5 justify-content-center">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={submitHandler}>
              <h2 className="mb-4">Registration</h2>
              <div className="row g-3">
                <div className="col-12">
                  <input
                   type="text"
                   className="form-control border-0"
                   placeholder="Enter Your Name (Required)"
                   style={{ height: '55px' }}
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                  />
                </div>

                <div className="col-12">
                   <select
                  className="form-select border-0"
                  style={{ height: '55px' }}
                   value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  required  >
                  <option value="">Select Department (Required)</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="BME">BME</option>
                  <option value="MSE">MSE</option>
                  <option value="IEM">IEM</option>
                  <option value="ESE">ESE</option>
                  <option value="LE">LE</option>
                  <option value="TE">TE</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Mechat">Mechat</option>
                  <option value="URP">URP</option>
                  <option value="BECM">BECM</option>
                  <option value="ARCH">ARCH</option>
                </select>
             </div>


             <div className="col-12">
                   <select
                  className="form-select border-0"
                  style={{ height: '55px' }}
                   value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  required  >
                  <option value="">Select Batch (Required)</option>
                  <option value="2k18">2K18</option>
                  <option value="2k19">2K19</option>
                  <option value="2k20">2K20</option>
                  <option value="2k21">2K21</option>
                  <option value="2k22">2K22</option>
                </select>
             </div>


             <div className="col-12">
                    <input
                      type="email"
                      className="form-control border-0"
                      placeholder="Enter Your Kuet Email Address (Required)"
                      style={{ height: '55px' }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
             </div>

             <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Enter Your Mobile Number (Required)"
                      style={{ height: '55px' }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
             </div>

             <div className="col-12">
                   <select
                  className="form-select border-0"
                  style={{ height: '55px' }}
                   value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  required  >
                  <option value="">Select Your Blood Group (Required)</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
             </div>

             
             <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text" style={{ width: '80%' }}>
                      How many time you have donated blood:
                    </span>
                    <input
                      type="number"
                      className="form-control border-0"
                      style={{ height: '35px', width: '20%' ,boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}}
                      min="0" // Minimum allowed value (1 for positive integers)
                      step="1"
                      value={donations}
                      onChange={(e) => setDonations(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text" style={{ width: '60%' }}>
                      Last time you have donated Blood:
                    </span>
                    <input
                      type="date"
                      className="form-control border-0"
                      style={{ height: '35px', width: '40%' }}
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      max={currentDate} // Set the maximum date to the current date
                    />
                  </div>
                </div>


                <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Enter The district you are currently in"
                      style={{ height: '55px' }}
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      required
                    />
             </div>
             

                <div className="col-12">
                  <div className="input-group">
                    <input
                      type={passwordInputType}
                      className="form-control border-0"
                      placeholder="Enter A Password(Required)"
                      style={{ height: '55px' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <i className="bi bi-eye"></i>
                      ) : (
                        <i className="bi bi-eye-slash"></i>
                      )}
                    </span>
                  </div>
                </div>


                <div className="col-12">
                  <div className="input-group">
                    <input
                      type={passwordInputType}
                      className="form-control border-0"
                      placeholder="Confirm Your Password(Required)"
                      style={{ height: '55px' }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <i className="bi bi-eye"></i>
                      ) : (
                        <i className="bi bi-eye-slash"></i>
                      )}
                    </span>
                  </div>
                </div>



                <div className="col-12">
                  <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                    Register
                  </button>
                  {loading && <Loader />}
                </div>
                <div className="col-12">
                  <p className="mt-3">
                    Already A Member? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Registerscreen;