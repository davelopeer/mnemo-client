import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { currentUser } from '../../data/mockData.js';
import styles from './Sidebar.module.css';

const sidebarLinks = [
  { to: '/perfil', label: 'Meu perfil', icon: 'user' },
  { to: '/amigos', label: 'Amigos', icon: 'friends' }
];

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user ? `${user.firstName} ${user.lastName}` : currentUser.name;
  const displayEmail = user?.email ?? currentUser.nickname;

  return (
    <aside className={styles.sidebar}>
      <section className={styles.userCard}>
        <Avatar src={currentUser.avatarUrl} alt={displayName} size="lg" ring />
        <div className={styles.userMeta}>
          <h3 className={styles.userName}>{displayName}</h3>
          <span className={styles.userNickname}>{displayEmail}</span>
        </div>
        <p className={styles.userBio}>{currentUser.bio}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>{currentUser.stats.memories}</strong>
            <span>memórias</span>
          </div>
          <div className={styles.stat}>
            <strong>{currentUser.stats.friends}</strong>
            <span>amigos</span>
          </div>
          <div className={styles.stat}>
            <strong>{currentUser.stats.posts}</strong>
            <span>posts</span>
          </div>
        </div>
      </section>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        iconLeft={<Icon name="plus" size={16} />}
        onClick={() => navigate('/criar-review')}
      >
        Criar review
      </Button>

      <nav className={styles.nav} aria-label="Navegação do usuário">
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <footer className={styles.pillars}>
        <h4 className={styles.pillarsTitle}>Mnemo</h4>
        <p>
          <strong>Memória</strong> do que você consumiu.
        </p>
        <p>
          <strong>Descoberta</strong> de novas obras.
        </p>
        <p>
          <strong>Conexão</strong> com pessoas afins.
        </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
