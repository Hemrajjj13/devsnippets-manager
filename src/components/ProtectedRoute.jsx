import { useSelector } from "react-redux";


const ProtectedRoute = ({ children, fallback }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return fallback || <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;