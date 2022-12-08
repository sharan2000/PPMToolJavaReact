import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/dashboard'>
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
              <a className='nav-link ' href='register.html'>
                Sign Up
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='login.html'>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
