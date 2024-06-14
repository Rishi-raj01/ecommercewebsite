import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('login', json.token);
        localStorage.setItem('email', credentials.email);
        setAuth({ ...auth, user: json.userDetails, token: json.token });
        localStorage.setItem('auth', JSON.stringify(json));
        toast.success('User logged in successfully');
        navigate(location.state || '/');
      } else {
        toast.warning('Enter valid credentials');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="Login - Ecommerce App" backgroundUrl="https://asset.gecdesigns.com/img/wallpapers/fairytale-valley-at-night-glowing-flowers-nature-wallpaper-sr10012422-1706504489805-cover.webp">
      <div className="form-container" style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
          <Link to="/forgetpassword" className="m-3 mx-1 btn btn-danger">forget password</Link>

        </form>
      </div>
    </Layout>
  );
};

const formContainerStyle = {
  backgroundImage: "url('https://asset.gecdesigns.com/img/wallpapers/fairytale-valley-at-night-glowing-flowers-nature-wallpaper-sr10012422-1706504489805-cover.webp')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  minHeight: 'calc(100vh - 50px)', // Adjust this value according to your layout
};

export default Login;
