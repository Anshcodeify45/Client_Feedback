import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
