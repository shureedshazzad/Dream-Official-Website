import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useVerifyOTPRegMutation } from '../slices/donorsApiSlice';

function Otpscreenforreg() {
  const { email } = useParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10); // Initial count set to 10

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTPAndLogin, { isLoading }] = useVerifyOTPRegMutation();
  const { donorInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    const timer = setInterval(async () => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      } else {
        toast.error("Otp is expired")
        try {
          clearInterval(timer);
          const res = await verifyOTPAndLogin({ email, otp: otp.join(''), count: 0 }).unwrap();
          console.log("Otp is expired");
          navigate(redirect);
        } catch (error) {
          navigate(redirect);
        }
      }
    }, 5000); // Decrease count every 5 seconds

    return () => clearInterval(timer);
  }, [count, email, navigate, redirect, verifyOTPAndLogin, otp]);

  useEffect(() => {
    if (donorInfo) {
      navigate(redirect);
    }
  }, [donorInfo, redirect, navigate]);

  const handleVerifyOTPAndLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await verifyOTPAndLogin({ email, otp: otp.join(''), count }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registration verification successful.');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.error || err.error, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically focus on the next input
      if (value !== '' && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

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
                    id={`otp-input-${index}`}
                    className="form-control border-0 text-center"
                    placeholder="0"
                    style={{ height: '55px' }}
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>
              ))}
              <div className="col-12">
                <small className="text-muted">Attempts left: {Math.max(count, 0)}</small>
              </div>
              <div className="col-12">
                <br />
              </div>
              <div className="col-12">
                <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading || count === 0}>
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
  );
}

export default Otpscreenforreg;
