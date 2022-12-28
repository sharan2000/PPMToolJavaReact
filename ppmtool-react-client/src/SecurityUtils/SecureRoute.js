import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ children, security: { validToken } }) => {
  if (validToken) {
    return children;
  }
  return <Navigate to='/login' />;
};

SecureRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(SecureRoute);
