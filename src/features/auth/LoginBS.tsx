import { Container, Card, Form, Button, Alert } from 'react-bootstrap'; 
import { useState } from 'react'; 
import { useAuth } from './AuthContext'; 
import api from '../../api/axios'; 
import { useNavigate } from 'react-router-dom';
  
export default function LoginBS() { 
  const { state, dispatch } = useAuth(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  
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

      // Après LOGIN_SUCCESS, créer un faux JWT : 
        const fakeToken = btoa(JSON.stringify({ 
        userId: user.id, 
        email: user.email, 
        role: 'admin', 
        exp: Date.now() + 3600000  // expire dans 1h 
        })); 
        
        // Stocker le token dans le state (PAS localStorage) : 
        dispatch({ type: 'LOGIN_SUCCESS', payload: { ...user, token: fakeToken } }); 

    //   dispatch({ type: 'LOGIN_SUCCESS', payload: user }); 
      navigate('/dashboard')
    } catch { 
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' }); 
    } 
  } 
  
  return ( 
    // Structure : 
<Container className="d-flex justify-content-center align-items-center" style={{ 
    height:'100vh' }}> 
    <Card style={{ maxWidth: 400, width: '100%' }}> 
        <Card.Body> 
        <Card.Title className="text-center" style={{ color:'#1B8C3E' }}>TaskFlow</Card.Title> 
        {state.error && <Alert variant="danger">{state.error}</Alert>} 
            <Form onSubmit={handleSubmit}> 
            <Form.Group className="mb-3"> 
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}  required /> 
            </Form.Group> 
            <Form.Group className="mb-3"> 
            <Form.Control type="password" placeholder="Mot de passe" value={password} 
              onChange={e => setPassword(e.target.value)}  required /> 
            </Form.Group> 
            <Button type="submit" className="w-100" >Se connecter</Button> 
            </Form> 
        </Card.Body> 
    </Card> 
</Container> 
  ); 
} 

//  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}> 
//             <TextField label="Email" type="email" value={email} 
//               onChange={e => setEmail(e.target.value)} fullWidth required /> 
//             <TextField label="Mot de passe" type="password" value={password} 
//               onChange={e => setPassword(e.target.value)} fullWidth required /> 
//             <Button type="submit" variant="contained" fullWidth disabled={state.loading} 
//               sx={{ bgcolor:'#1B8C3E', '&:hover':{ bgcolor:'#157a33' } }}> 
//               {state.loading ? 'Connexion...' : 'Se connecter'} 
//             </Button> 
//           </form> 