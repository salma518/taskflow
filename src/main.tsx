import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD
import { AuthProvider } from './features/auth/AuthContext';   
import { BrowserRouter } from 'react-router-dom'; 

createRoot(document.getElementById('root')!).render( 
  <StrictMode> 
    <BrowserRouter> 
      <AuthProvider> 
        <App /> 
      </AuthProvider> 
    </BrowserRouter> 
  </StrictMode> 
); 
=======

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
>>>>>>> ed1864d (TP1)
