import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';
export default function Forgetpassword() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '' });

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/user/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        toast.success('Password reset link has been sent to your email');
      } else {
        toast.error('Enter valid credentials');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error occurred');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url("https://asset.gecdesigns.com/img/wallpapers/aesthetic-purple-orange-beautiful-nature-desktop-wallpaper-sr10012413-1706503295947-cover.webp")', backgroundSize: 'cover' }}>
        <form className='w-50 m-auto border rounded p-4' onSubmit={handleForgetPassword} style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
          <h2 className="text-center text-white mb-4">Forget Password</h2>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label text-white'>
              Email address
            </label>
            <input type='email' className='form-control' name='email' value={credentials.email} onChange={onChange} aria-describedby='emailHelp' style={{ background: 'rgba(255, 255, 255, 0.15)', transition: 'background 0.3s ease' }} />
            <div id='emailHelp' className='form-text text-white'>
              We'll never share your email with anyone.
            </div>
          </div>

          <button type='submit' className='btn btn-success w-100' style={{ transition: 'background-color 0.3s ease' }}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
