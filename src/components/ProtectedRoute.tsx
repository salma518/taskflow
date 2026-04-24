import { useAuth } from '../features/auth/AuthContext'; 
import { Navigate, useLocation } from 'react-router-dom'; 
import { type RootState } from '../store';

import { useSelector } from 'react-redux';

interface Props { children: React.ReactNode; } 
  
export default function ProtectedRoute({ children }: Props) { 
  
  //const { state } = useAuth(); 

  const { user, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation(); 

   // Attendre la rehydratation Redux avant de rediriger
  if (loading) return null;
  
  if (!user) { 
    return <Navigate to="/login" state={{ from: location.pathname }} replace />; 
  } 
  
  return <>{children}</>; 
  
} 