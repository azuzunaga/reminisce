import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/reminisceAlexBrushBlack.png';
import arrowDown from '../assets/down-arrow.png';
class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
      return;
      default:
      return (
        <ul className="user-info">
          <li>
            <Link to="/about">
              About Us
            </Link>
          </li>
          <li>
            <a href="https://github.com/azuzunaga/reminisce" target="_blank" rel="noopener noreferrer" >GitHub</a>
          </li>

          <li className="hover-family">

            <img
              alt="Profile"
              className="user-pic"
              src={this.props.auth.imageUrl + "?sz=64"}
            />
            <div className="hover-arrow">
            <img alt="Arrow Down" src={arrowDown}/>
            </div>
            <span className="sign-out">
              <a  href="api/logout">Sign Out</a>
            </span>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="nav-container">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            href="/dashboard" className="brand-logo"
          >
            <img className="logo" src={logo} alt="Reminisce Logo"/>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
      </nav>
  );
}
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
