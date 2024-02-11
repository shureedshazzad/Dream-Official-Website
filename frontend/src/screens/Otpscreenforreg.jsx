import React, { useState, useEffect } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useVerifyOTPRegMutation } from '../slices/donorsApiSlice';

function Otpscreenforreg() {

  const { email } = useParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [expirationTime, setExpirationTime] = useState(new Date(Date.now() + 4 * 60 * 1000)); // 4 minutes expiration
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTPAndLogin, { isLoading }] = useVerifyOTPRegMutation();


  const { donorInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (donorInfo) {
      navigate(redirect);
    }
  }, [donorInfo, redirect, navigate]);




  const handleVerifyOTPAndLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await verifyOTPAndLogin({ email, otp: otp.join('') }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registrtion verification successful.');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.error || err.error, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const remainingTime = Math.max(0, Math.floor((expirationTime - now) / 1000));
      setExpirationTime((prevExpirationTime) => (now < prevExpirationTime ? prevExpirationTime : now));
      setCountdown(remainingTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationTime]);

  const [countdown, setCountdown] = useState(() => {
    const now = new Date();
    return Math.max(0, Math.floor((expirationTime - now) / 1000));
  });


   
  return (
    <div className="container-xxl py-5 d-flex align-items-center justify-content-center">
    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="bg-light rounded h-100 d-flex align-items-center p-5">
        <form onSubmit={handleVerifyOTPAndLogin}>
          <h2 className="mb-4">Verify OTP</h2>
          <div className="row g-3">
            {otp.map((digit, index) => (
              <div className="col-3" key={index}>
                <input
                  type="text"
                  className="form-control border-0 text-center"
                  placeholder="0"
                  style={{ height: '55px' }}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => {
                    const updatedOtp = [...otp];
                    updatedOtp[index] = e.target.value;
                    setOtp(updatedOtp);
                  }}
                  required
                />
              </div>
            ))}
            <div className="col-12">
              <small className="text-muted">OTP will expire in {Math.floor(countdown / 60)}:{countdown % 60} minutes</small>
            </div>
            <div className="col-12">
              <br />
            </div>
            <div className="col-12">
              <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                Verify OTP
              </button>
              {loading && <Loader />}
            </div>
            <div className="col-12"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Otpscreenforreg