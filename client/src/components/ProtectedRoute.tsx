import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logoutUser } from '@/store/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsValidating(false);
        return;
      }

      try {
        // Check if token is expired
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenPayload.exp < currentTime) {
          // Token is expired, logout user
          dispatch(logoutUser());
        }
      } catch (error) {
        // Invalid token, logout user
        dispatch(logoutUser());
      }
      
      setIsValidating(false);
    };

    validateToken();
  }, [accessToken, dispatch]);

  // Show loading while validating
  if (isValidating) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Check if user is authenticated
  if (!user || !accessToken) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
