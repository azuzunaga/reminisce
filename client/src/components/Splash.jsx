import React from 'react';
import '../styles/splash.css';
import logo from '../assets/reminisceAlexBrushWhite.png';
const Splash = () => {
  return (
    <div className="splash-container">
        <h1 className="our-logo"><img src={logo} alt="Reminisce Logo"/></h1>
        <h4 className="welcome-text">
          The tool that writers can't live without.
          Maintain countless drafts and still maintain your sanity.
        </h4>
        <a className="google-signin"
          href="/auth/google">Sign in with Google
        </a>
      </div>
  );
};

export default Splash;
