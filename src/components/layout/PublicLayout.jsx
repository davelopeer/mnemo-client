import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import styles from "./PublicLayout.module.css";

function PublicLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link
            to={isAuthenticated ? "/profile" : "/"}
            className={styles.brand}
          >
            <span className={styles.brandMark}>F</span>
            <span className={styles.brandName}>Finis</span>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
