import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import "../../styles/Register.css"
const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          phone: credentials.phone,
          location: credentials.location,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        toast.success('User registered successfully');
        navigate('/');
      } else {
        console.error('Server responded with error:', response.statusText);
        toast.error('Server responded with error');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error occurred');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <Layout>
      {/* <style>{`
        .register-container {
          background-image: url('https://gecdesigns.com/wallpapers/free/starry-night-sky-reflection-background-hd-wallpaper-sr10012425.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .form-container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          color: #fff;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }

        .submit-btn {
          background-color: #007bff;
          color: #fff;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }

        .btn.btn-danger {
          background-color: #dc3545;
          color: #fff;
        }

        .btn.btn-danger:hover {
          background-color: #c82333;
        }

        h1 {
          color: #fff;
          text-align: center;
          margin-bottom: 30px;
        }
      `}</style> */}
      <div className='register-container'>
        <form onSubmit={handleSubmit} className='form-container'>
          <h1>Please enter your details here to register</h1>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={credentials.name} required onChange={onChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input type='email' className='form-control' name='email' value={credentials.email} required onChange={onChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={credentials.password} required onChange={onChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone number</label>
            <input type='text' className='form-control' name='phone' value={credentials.phone} required onChange={onChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Address</label>
            <input type='text' className='form-control' name='location' value={credentials.location} onChange={onChange} />
          </div>
          <button type='submit' className='btn submit-btn'>
            Submit
          </button>
          <Link to='/login' className='btn btn-danger'>
            Already a user
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
