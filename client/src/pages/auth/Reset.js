import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Reset() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ password: '', confirmpassword: '' });

  const handlechangepassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/user/resetpassword/:token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert('Password has been reset. Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover' }}>
      <form className='w-50 m-auto border rounded p-4' onSubmit={handlechangepassword} style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
        <h2 className="text-center text-white mb-4">Reset Password</h2>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label text-white'>Password</label>
          <input type='password' className='form-control' value={credentials.password} onChange={onChange} name='password' style={{ background: 'rgba(255, 255, 255, 0.15)', transition: 'background 0.3s ease' }} />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword2' className='form-label text-white'>Confirm Password</label>
          <input type='password' className='form-control' value={credentials.confirmpassword} onChange={onChange} name='confirmpassword' style={{ background: 'rgba(255, 255, 255, 0.15)', transition: 'background 0.3s ease' }} />
        </div>

        <button type='submit' className='btn btn-success w-100' style={{ transition: 'background-color 0.3s ease' }}>
          Submit
        </button>
      </form>
    </div>
  );
}
