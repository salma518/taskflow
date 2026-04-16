import { useState, useEffect } from 'react'; 
import { useAuth } from '../features/auth/AuthContext'; 
import api from '../api/axios'; 
import Header from '../components/Header'; 
import Sidebar from '../components/Sidebar'; 
import MainContent from '../components/MainContent'; 
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css'; 
import axios from 'axios';
import HeaderMUI from '../components/HeaderMUI'; 
import useProjects from '../hooks/useProjects'; 
  
interface Project { id: string; name: string; color: string; } 
interface Column { id: string; title: string; tasks: string[]; } 
  
export default function Dashboard() { 
  const { state: authState, dispatch } = useAuth(); 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [projects, setProjects] = useState<Project[]>([]); 
  const [columns, setColumns] = useState<Column[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [showForm, setShowForm] = useState(false); 
  
  // Dans Dashboard, ajoutez ce test temporaire : 
  const dangerousName = '<img src=x onerror=alert("HACK")>'; 
  
  // GET — charger les données au montage 
  useEffect(() => { 
    async function fetchData() { 
      try { 
        const [projRes, colRes] = await Promise.all([ 
          api.get('/projects'), 
          api.get('/columns'), 
        ]); 
        setProjects(projRes.data); 
        setColumns(colRes.data); 
      } catch (e) { console.error(e); } 
      finally { setLoading(false); } 
    } 
    fetchData(); 
  }, []); 
  
  // POST — ajouter un projet 
  // async function addProject(name: string, color: string) { 
  //   const { data } = await api.post('/projects', { name, color }); 
  //   setProjects(prev => [...prev, data]); 
  // } 
  
    
const [error, setError] = useState<string | null>(null); 
const [saving, setSaving] = useState(false); 
  
async function addProject(name: string, color: string) { 
  setSaving(true); 
  setError(null); 
  try { 
    const { data } = await api.post('/projects', { name, color }); 
    setProjects(prev => [...prev, data]); 
  } catch (err) { 
    if (axios.isAxiosError(err)) { 
      setError(err.response?.data?.message || `Erreur ${err.response?.status}`); 
    } else { 
      setError('Erreur inconnue'); 
    } 
  } finally { 
    setSaving(false); 
  } 
} 


  // PUT — renommer un projet 
  // À VOUS D'ÉCRIRE (voir specs ci-dessous) 

async function renameProject(id: string, newName: string) {
  setSaving(true);
  setError(null);
  try {
    const { data } = await api.put(`/projects/${id}`, { name: newName });
    setProjects(prev =>
      prev.map(proj => (proj.id === id ? { ...proj, name: data.name } : proj))
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || `Erreur ${err.response?.status}`);
    } else {
      setError('Erreur inconnue');
    }
  } finally {
    setSaving(false);
  }
}

  
  // DELETE — supprimer un projet 
  // À VOUS D'ÉCRIRE (voir specs ci-dessous) 

  async function deleteProject(id: string) {
  setSaving(true);
  setError(null);
  try {
    await api.delete(`/projects/${id}`);

    setProjects(prev => prev.filter(proj => proj.id !== id));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || `Erreur ${err.response?.status}`);
    } else {
      setError('Erreur inconnue');
    }
  } finally {
    setSaving(false);
  }
}
  
  if (loading) return <div className={styles.loading}>Chargement...</div>; 
  
  return ( 
    <div className={styles.layout}> 
      <HeaderMUI 
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={authState.user?.name} 
        onLogout={() => dispatch({ type: 'LOGOUT' })} 
      /> 

      {/* <p>{dangerousName}</p>  */}
      {/* <div dangerouslySetInnerHTML={{ __html: dangerousName }} />  */}
      
      <div className={styles.body}> 
        <Sidebar projects={projects} isOpen={sidebarOpen} onRename={renameProject}  
  onDelete={deleteProject} /> 
        <div className={styles.content}> 
          <div className={styles.toolbar}> 
            {!showForm ? ( 
              <button className={styles.addBtn} 
                onClick={() => setShowForm(true)}> 
                + Nouveau projet 
              </button> 
            ) : ( 
              <ProjectForm 
                submitLabel="Créer" 
                onSubmit={(name, color) => { 
                  addProject(name, color); 
                  setShowForm(false); 
                }} 
                onCancel={() => setShowForm(false)} 
                saving={saving}
              /> 
            
            )} 
            {error && <p className={styles.error}>{error}</p>}
          </div> 
          <MainContent columns={columns} /> 
        </div> 
      </div> 
    </div> 
  ); 
} 