import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { login } from "../../actions/SecurityActions";
import { clearErrors } from "../../actions/ErrorActions";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import classnames from "classnames";

const Login = ({ security: { validToken }, errors, login, clearErrors }) => {
  const [loginRequestData, setLoginRequestData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [localErrors, setLocalErrors] = useState({});

  const { username, password } = loginRequestData;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      clearErrors();
    }
  }, [errors]);

  useEffect(() => {
    if (validToken) {
      navigate("/dashboard");
    }
  }, [validToken]);

  const onChange = (e) => {
    setLoginRequestData({
      ...loginRequestData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(loginRequestData);
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <form onSubmit={onSubmit} action='dashboard.html'>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.username,
                  })}
                  placeholder='Email Address'
                  name='username'
                  value={username}
                  onChange={onChange}
                />
                {localErrors.username && (
                  <div className='invalid-feedback'>{localErrors.username}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                {localErrors.password && (
                  <div className='invalid-feedback'>{localErrors.password}</div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
