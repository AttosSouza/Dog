import React from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);

  return login ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
