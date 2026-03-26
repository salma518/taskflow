import { Navigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../features/auth/AuthContext'; 
  
interface Props { children: React.ReactNode; } 
  
export default function ProtectedRoute({ children }: Props) { 
  const { state } = useAuth(); 
  const location = useLocation(); 
  
  if (!state.user) { 
    return <Navigate to="/login" state={{ from: location.pathname }} replace />; //pour conserver le dernier path avant le loading ex: si je suis dans la page detail et puis la session à terminer, après le login il va s'afficher la page du detail non du dashboard
  } 
  
  return <>{children}</>; 
} 