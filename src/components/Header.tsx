import styles from './Header.module.css'; 
<<<<<<< HEAD
  
interface HeaderProps { 
  title: string; 
  onMenuClick: () => void; 
  userName?: string; 
  onLogout?: () => void; 
} 
  
export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) { 
=======

interface HeaderProps { title: string; onMenuClick: () => void; } 
  
export default function Header({ title, onMenuClick }: HeaderProps) { 
>>>>>>> ed1864d (TP1)
  return ( 
    <header className={styles.header}> 
      <div className={styles.left}> 
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button> 
        <h1 className={styles.logo}>{title}</h1> 
      </div> 
<<<<<<< HEAD
      <div className={styles.right}> 
        {userName && <span className={styles.userName}>{userName}</span>} 
        {onLogout && ( 
          <button className={styles.logoutBtn} onClick={onLogout}> 
            Déconnexion 
          </button> 
        )} 
      </div> 
=======
      <span className={styles.avatar}>JD</span> 
>>>>>>> ed1864d (TP1)
    </header> 
  ); 
} 