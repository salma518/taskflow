import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import styles from './Login.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const from = (location.state as any)?.from || '/dashboard';

  // ✅ FIX : on lit `user` depuis useSelector, plus `state.user`
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data: users } = await api.get(`/users?email=${email}`);
      if (users.length === 0 || users[0].password !== password) {
        // ✅ FIX : action creator au lieu de dispatch brut
        dispatch(loginFailure('Email ou mot de passe incorrect'));
        return;
      }
      const { password: _, ...safeUser } = users[0];
      const fakeToken = crypto.randomUUID();
      // ✅ FIX : action creator loginSuccess
      dispatch(loginSuccess({ user: safeUser, token: fakeToken }));
    } catch {
      dispatch(loginFailure('Erreur serveur'));
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>Connectez-vous pour continuer</p>
        {/* ✅ FIX : `error` depuis useSelector, plus `state.error` */}
        {error && <div className={styles.error}>{error}</div>}
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          className={styles.input} required />
        <input type="password" placeholder="Mot de passe"
          value={password} onChange={e => setPassword(e.target.value)}
          className={styles.input} required />
        {/* ✅ FIX : `loading` depuis useSelector, plus `state.loading` */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}