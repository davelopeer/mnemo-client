import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './ProfileHeader.module.css';

function ProfileHeader({ user }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.cover} aria-hidden="true" />
      <div className={styles.content}>
        <Avatar src={user.avatarUrl} alt={user.name} size="xl" ring />
        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.nickname}>{user.nickname}</span>
          <p className={styles.bio}>{user.bio}</p>

          <ul className={styles.interests}>
            {user.interests.map((interest) => (
              <li key={interest} className={styles.interest}>
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" iconLeft={<Icon name="mail" size={16} />}>
            Mensagem
          </Button>
          <Button variant="primary" iconLeft={<Icon name="sparkle" size={16} />}>
            Editar perfil
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
