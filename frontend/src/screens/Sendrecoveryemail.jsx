import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useForgotPasswordMutation } from '../slices/donorsApiSlice';
import { toast } from 'react-toastify';

function Sendrecoveryemail() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [forgotPassword, { isLoading  }] = useForgotPasswordMutation(); // from donorsApislice

  

 

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
          setLoading(true); // Show the loade
          await forgotPassword(email).unwrap();
          navigate(`/otp/${email}`);
          toast.success('Password recovery email sent successfully. Check your email.');
        } catch (err) {
          if (err?.data?.error === 'Donor not found') {
            toast.error('No account found with this email.', { autoClose: 5000 });
          } else {
            toast.error(err?.data?.error || err.error, { autoClose: 5000 });
          }
        } finally {
            setLoading(false); // Hide the loader
        }
      };

  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={handleForgotPassword}>
              <h2 className="mb-4">Password Recovery</h2>
              <div className="row g-3">
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Confirm Your Email"
                    style={{ height: '55px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  required/>
                </div>
                <div className="col-12">
                  <br /> {/* Line break here */}
                </div>
                <div className="col-12">
                  <button className="btn btn-danger w-100 py-3" type="submit" disabled={isLoading || loading}>
                      Send OTP
                  </button>
                  {loading && <Loader />}
                </div>
                <div className="col-12">
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="d-flex align-items-center justify-content-center h-100">
            <img
              src="/images/remail.jpg"
              alt="Login Image"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Sendrecoveryemail