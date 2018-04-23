import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
      return;
      case false:
      return (
        <ul className="right">
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        </ul>
      );
      default:
      return (
        <ul className="right">
          <li>
            Hi, {this.props.auth.firstName}
          </li>
          <li>
            <img src={this.props.auth.imageUrl + "?sz=64"} alt=""/>
          </li>
          <li>
            <a href="api/logout">Sign Out</a>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/dashboard" className="left brand-logo">
            Reminisce
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
  );
}
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
