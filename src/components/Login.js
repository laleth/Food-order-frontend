import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API } from '../Global';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';
import "../style/login.css"

function Login({ setAuthenticated }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const validatelogin = async () => {
    try {
      const response = await axios.post(`${API}/users/login`, { email: loginEmail, password: loginPassword });
      if (response.status === 200) {
        const token = response.data.token;
        console.log('Received Token:', token);
        localStorage.setItem('Authorization', token); 
        setAuthenticated(true);
        navigate('/home');
        openNotification('success', 'Login Successful', 'You have successfully logged in.');
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (error) {
      console.error('Error during Login:', error.message);
      openNotification('error', 'Login Error', 'There was an error during login.');
    }
  };

  const validateregister = async () => {
    try {
      const response = await axios.post(`${API}/users/register`, { username, password: registerPassword, email: registerEmail });
      if (response.status === 200) {
        openNotification('success', 'Registration Successful', 'User registered successfully.');
        setUsername('');
        setRegisterPassword('');
        setRegisterEmail('');
      }
    } catch (error) {
      console.error('Error during Register:', error.message);
      openNotification('error', 'Registration Error', 'There was an error during registration.');
    }
  };

  return (
    <div className="login-register">
      <div className="tab-container">
        <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
          Login
        </div>
        <div className={`tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
          Register
        </div>
      </div>
      <div className={`login form-container ${activeTab === 'login' ? 'active' : ''}`}>
        <Form>
          <Form.Control
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <br/>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <br/>
          <Button className='btn-login' variant="primary" onClick={() => validatelogin()}>
            Login
          </Button>
        </Form>
      </div>
      <div className={`register form-container ${activeTab === 'register' ? 'active' : ''}`}>
        <Form>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br/>
          <Form.Control
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <br/>
          <Form.Control
            type="text"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <br/>
          <Button className='btn-login' variant="success" onClick={() => validateregister()}>
            Register
          </Button>
        </Form>
      </div>
      <div>
        <Link to="/password-reset">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
