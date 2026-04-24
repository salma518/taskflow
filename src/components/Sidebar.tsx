import styles from './Sidebar.module.css'; 
import { NavLink } from 'react-router-dom'; 

interface Project { id: string; name: string; color: string; } 
interface SidebarProps { projects: Project[]; 
  isOpen: boolean;
  onRename : (id: string, newName: string) => void;
  onDelete : (id: string) => void;
 } 
  
export default function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) { 
  console.log('Sidebar re-render');
  return ( 
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}> 
      <h2 className={styles.title}>Mes Projets</h2> 
      <ul className={styles.list}> 
      {projects.map(p => (
  <li key={p.id} className={styles.projectItem}>
    <NavLink
      to={`/projects/${p.id}`}
      className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ''}`
      }
    >
      <span className={styles.dot} style={{ background: p.color }} />
      {p.name}
    </NavLink>

    {/* Boutons action à côté du lien */}
    {onRename && (
      <button
        className={styles.renameBtn}
        onClick={() => {
          const newName = prompt('Nouveau nom ?', p.name);
          if (newName) onRename(p.id, newName);
        }}
      >
        Renommer
      </button>
    )}

    {onDelete && (
      <button
        className={styles.deleteBtn}
        onClick={() => {
          if (confirm('Supprimer ce projet ?')) onDelete(p.id);
        }}
      >
        Supprimer
      </button>
    )}
  </li>
))}
      </ul> 
    </aside> 
  ); 
} 