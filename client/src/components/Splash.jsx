import React from 'react';
import '../styles/splash.css';
import logo from '../assets/reminisceLogoWhite.png';

const Splash = () => {
  return (
    <div className="splash-container">
      <img className="splash-logo" src={logo} alt="Reminisce Logo" />
      <h4 className="welcome-text">
        the tool that writers can't live without. maintain countless drafts and
        still maintain your sanity.
      </h4>
      <div className="login-buttons">
        <a className="google-signin" href="/auth/google">
          login
        </a>
        <a className="google-signin" href="/api/demo_login">
          demo
        </a>
      </div>
    </div>
  );
};

export default Splash;
