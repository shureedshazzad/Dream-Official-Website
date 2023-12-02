import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/donorsApiSlice';

const Profilescreen = () => {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [currentLocation,setCurrentLocation] = useState('');
  const [lastDonationDate,setLastDonationDate] = useState('');
  const [newPassword, setNewPassword] = useState(''); // New password state
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { donorInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const currentDate = new Date().toISOString().split('T')[0];



  useEffect(() => {
    if (donorInfo) {
      setName(donorInfo.name);
      setDept(donorInfo.dept);
      setBatch(donorInfo.batch);
      setEmail(donorInfo.email);
      setPhoneNumber(donorInfo.phoneNumber);
      setBloodType(donorInfo.bloodType);
      setCurrentLocation(donorInfo.currentLocation);
      setLastDonationDate(donorInfo.setLastDonationDate);
    }
  }, [donorInfo]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  const validatePassword = (input) => {
    // Password pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$]).{6,}$/;
    if (!passwordPattern.test(input)) {
      setPasswordError(
        'Password should be at least 6 characters in length and contains at least one uppercase letter (A-Z), at least one lowercase letter (a-z), at least one special character from the set !@#$'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const profileUpdateData = {
        _id: donorInfo._id,
        phoneNumber,
        currentLocation,
        lastDonationDate,
      };

      if (newPassword) {
        if (!validatePassword(newPassword)) {
          toast.error('Password should be at least 6 characters in length and contains at least one uppercase letter (A-Z), at least one lowercase letter (a-z), at least one special character from the set !@#$');
          return;
        }
        if (newPassword!=confirmPassword) {
          toast.error('Please confirm the new password');
          return;
        }

        profileUpdateData.password = newPassword;
      }

      const res = await updateProfile(profileUpdateData).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile is updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form onSubmit={submitHandler}>
                <h2 className="mb-4">Edit Profile</h2>
                <div className="row g-3">
                  <div className="col-12">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={name}
                    />
                  </div>
                  <div className="col-12">
                    <label>Department:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={dept}
                    />
                  </div>

                  <div className="col-12">
                    <label>Batch:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={batch}
                    />
                  </div>
                  <div className="col-12">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={email}
                    />
                  </div>
                  <div className="col-12">
                    <label>Change the PhoneNumber?</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label>Blood Type:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={bloodType}
                    />
                  </div>

                  <div className="col-12">
                    <label>Current Location:</label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{ height: '55px' }}
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                    />
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
                      max={currentDate} 
                    />
                  </div>
                </div>


                  <div className="col-12">
                    <div className="input-group">
                      <input
                        type={passwordInputType}
                        className="form-control border-0"
                        placeholder="Enter your New Password (Leave it blank to keep the current password)"
                        style={{ height: '55px' }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span className="input-group-text" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <input
                        type={passwordInputType}
                        className="form-control border-0"
                        placeholder="Confirm Your Password (Required)"
                        style={{ height: '55px' }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span className="input-group-text" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-danger w-100 py-3"
                      type="submit"
                      disabled={loading || loadingUpdateProfile}
                    >
                      Save Profile
                    </button>
                    {loadingUpdateProfile && <Loader />}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="d-flex align-items-center justify-content-center h-100">
            <img
              src="/images/user.jpg"
              alt="Doctor Image"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profilescreen;
