<<<<<<< HEAD
import { useState } from 'react'; 
=======
import { useState, useEffect } from 'react'; 
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from 
'@mui/material'; 
import { useAuth } from './AuthContext'; 
import api from '../../api/axios'; 
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate, useLocation, replace } from 'react-router-dom'; 
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
  
export default function LoginMUI() { 
  const { state, dispatch } = useAuth(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
<<<<<<< HEAD
  const navigate = useNavigate();
=======

  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  
  const from = (location.state as any)?.from || '/dashboard'; 
  useEffect(() => { 
      if (state.user) navigate(from,{replace:true});  // BUG: pour ne pas retourner en page login (login s'efface du historique) 
    }, [state.user, navigate, from]); 
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
  
  async function handleSubmit(e: React.FormEvent) { 
    e.preventDefault(); 
    dispatch({ type: 'LOGIN_START' }); 
    try { 
      const { data: users } = await api.get(`/users?email=${email}`); 
      if (users.length === 0 || users[0].password !== password) { 
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' }); 
        return; 
      } 
      const { password: _, ...user } = users[0]; 
      dispatch({ type: 'LOGIN_SUCCESS', payload: user }); 
<<<<<<< HEAD
      navigate('/dashboard')
=======
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
    } catch { 
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' }); 
    } 
  } 
  
  return ( 
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', 
bgcolor:'#f0f0f0' }}> 
      <Card sx={{ maxWidth: 400, width: '100%' }}> 
        <CardContent sx={{ display:'flex', flexDirection:'column', gap:2, p:4 }}> 
          <Typography variant="h4" align="center" color="#1B8C3E" fontWeight={700}> 
<<<<<<< HEAD
            TaskFlow MUI
=======
            TaskFlowMUI 
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
          </Typography> 
          <Typography variant="body2" align="center" color="text.secondary"> 
            Connectez-vous pour continuer 
          </Typography> 
  
          {state.error && <Alert severity="error">{state.error}</Alert>} 
  
<<<<<<< HEAD
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}> 
=======
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', 
gap:'16px' }}> 
>>>>>>> 932eaa45c7b0b714a31085577c5e1b18dd0d9866
            <TextField label="Email" type="email" value={email} 
              onChange={e => setEmail(e.target.value)} fullWidth required /> 
            <TextField label="Mot de passe" type="password" value={password} 
              onChange={e => setPassword(e.target.value)} fullWidth required /> 
            <Button type="submit" variant="contained" fullWidth disabled={state.loading} 
              sx={{ bgcolor:'#1B8C3E', '&:hover':{ bgcolor:'#157a33' } }}> 
              {state.loading ? 'Connexion...' : 'Se connecter'} 
            </Button> 
          </form> 
        </CardContent> 
      </Card> 
    </Box> 
  ); 
} 