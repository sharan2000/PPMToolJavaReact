import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/SecurityActions";
import PropTypes from "prop-types";

const Header = ({ security: { validToken, user }, logout }) => {
  const Logout = (e) => {
    logout();
  };

  const isAuthenticatedFragment = (
    <div className='collapse navbar-collapse' id='mobile-nav'>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
      </ul>

      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link ' to='/dashboard'>
            <i className='fas fa-user-circle mr-1' />
            {user.username}
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/' onClick={Logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const isNotAuthenticatedFragment = (
    <div className='collapse navbar-collapse' id='mobile-nav'>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link ' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  let headerLinks;

  if (validToken && user) {
    headerLinks = isAuthenticatedFragment;
  } else {
    headerLinks = isNotAuthenticatedFragment;
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Personal Project Management Tool
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mobile-nav'
          aria-controls='mobile-nav'
          aria-expanded='false'
        >
          <span className='navbar-toggler-icon' />
        </button>
        {headerLinks}
      </div>
    </nav>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
