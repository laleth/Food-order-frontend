import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Global';
import { notification } from 'antd';
import "../style/passwordreset.css"

function Passwordreset() {
  const [email, setEmail] = useState('');
  const [resetcode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const requestResetCode = async () => {
    try {
      const response = await axios.post(`${API}/users/reset-code-request`, { email });
      if (response.status === 200) {
        openNotification('success', 'Reset Code Sent', 'Check your email for the reset code.');
      }
    } catch (error) {
      console.error('Error requesting reset code:', error.message);
      openNotification('error', 'Reset Code Request Error', 'There was an error requesting the reset code.');
    }
  };

  const resetPassword = async () => {
    try {
      const payload = { email, resetcode, newPassword };
      const response = await axios.post(`${API}/users/reset-password`, payload, { headers: { 'Content-Type': 'application/json' } });

      if (response.status === 200) {
        openNotification('success', 'Password Reset Successful', 'Your password has been successfully reset.');
        setEmail('');
        setResetCode('');
        setNewPassword('');
      }
    } catch (error) {
        console.error('Error requesting reset code:', error.message);
        openNotification('error', 'Reset Request Error', 'There was an error requesting the password.');
    }
  };

  return (
    <div className="reset-password">
      <div className="title">Reset Password</div>
      
      <Form>
      <div className='reset-email-field'>
        <Form.Control
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <br/>
        <div className='btn'>
        <Button className='btn-1' variant="primary" onClick={requestResetCode}>
          Request Reset Code
        </Button>
        </div>
        <br/>
        <Form.Control
          type="text"
          placeholder="Reset Code"
          value={resetcode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <br/>
        <Form.Control
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br/>
        <Button className = 'btn-1' variant="success" onClick={resetPassword}>
          Reset Password
        </Button>
      </Form>
      <div>
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}

export default Passwordreset;
