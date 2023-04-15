import React, { useState } from 'react';
import './ConnectForm.scss';
import { Link } from 'react-router-dom';

const ConnectForm = ({ onConnect }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('8088');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleIPAddressChange = (e) => {
    setIpAddress(e.target.value);
    setErrorMessage('');
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
    setErrorMessage('');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConnect({ ipAddress, port, username, password }, setErrorMessage);
  };
  return (
    <div className="connect-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Connect to vMix API</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          IP Address:
          <input
            type="text"
            value={ipAddress}
            onChange={handleIPAddressChange}
            pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
            required
          />
          <span className="input-example">Example: <Link to={"documentation"}>192.168.1.100</Link></span>
        </label>
        <label>
          Port:
          <input
            type="text"
            value={port}
            onChange={handlePortChange}
            pattern="\d+"
          />
          <span className="input-example">Example: 8088</span>
        </label>
        <label>
          Username (optional):
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password (optional):
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Connect</button>
      </form>
    </div>
  );
};

export default ConnectForm;
