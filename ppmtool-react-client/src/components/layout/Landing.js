import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ security: { validToken } }) => {
  if (validToken) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div className='landing'>
      <div className='light-overlay landing-inner text-dark'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>
                Personal Project Management Tool
              </h1>
              <p className='lead'>
                Create your account to join active projects or start your own
              </p>
              <hr />
              <Link to='/register' className='btn btn-lg btn-primary mr-2'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-lg btn-secondary mr-2'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTtypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, null)(Landing);
