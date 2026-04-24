import styles from './MainContent.module.css';
import Tooltip from './Tooltip';
import { memo } from 'react';

interface Column { id: string; title: string; tasks: string[]; } 
interface MainContentProps { columns: Column[]; } 
  
function MainContent({ columns }: MainContentProps) { 
  console.log('MainContent re-render');
  
// Le toggle de la sidebar modifie un état dans un composant parent (probablement App ou équivalent).
// En React, quand un parent se re-render, tous ses enfants se re-render par défaut, même si leurs 
// props n'ont pas changé.

  return ( 
   
<main className={styles.main}> 
<div className={styles.board}> 
   <Tooltip/>
{columns.map(col => ( 
<div key={col.id} className={styles.column}> 
<h3 className={styles.colTitle}>{col.title} ({col.tasks.length})</h3> 
{col.tasks.map((task, i) => ( 
<div key={i} className={styles.card}>{task}</div> 
))} 
</div> 
))} 
</div> 
</main> 
); 

} 
export default memo(MainContent);

// Parce que memo empêche React de re-render le composant si ses props n’ont pas changé.
