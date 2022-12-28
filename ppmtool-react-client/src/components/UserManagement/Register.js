import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/SecurityActions";

import { connect } from "react-redux";
import { clearErrors } from "../../actions/ErrorActions";
import PropTypes from "prop-types";
import classnames from "classnames";

const Register = ({
  security: { validToken },
  errors,
  clearErrors,
  registerUser,
}) => {
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  const navigate = useNavigate();

  const { username, fullname, password, confirmPassword } = user;

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
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(user, navigate);
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your Account</p>
            <form onSubmit={onSubmit} action='create-profile.html'>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.fullname,
                  })}
                  placeholder='Full Name'
                  name='fullname'
                  value={fullname}
                  onChange={onChange}
                />
                {localErrors.fullname && (
                  <div className='invalid-feedback'>{localErrors.fullname}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.username,
                  })}
                  placeholder='Username / Email Address'
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
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.confirmPassword,
                  })}
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChange}
                />
                {localErrors.confirmPassword && (
                  <div className='invalid-feedback'>
                    {localErrors.confirmPassword}
                  </div>
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

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { clearErrors, registerUser })(
  Register
);
