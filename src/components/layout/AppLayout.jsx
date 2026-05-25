import { Outlet } from 'react-router-dom';
import TopNavigation from './TopNavigation.jsx';
import Sidebar from './Sidebar.jsx';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.shell}>
      <TopNavigation />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
