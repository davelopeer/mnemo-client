import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './ProfileHeader.module.css';

function ProfileHeader({ user, isOwnProfile = false, onEdit }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <Avatar src={user.avatarUrl} alt={user.name} size="xl" ring />
        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.nickname}>{user.nickname}</span>
          <p className={styles.bio}>{user.bio}</p>

          {user.interests?.length ? (
            <ul className={styles.interests}>
              {user.interests.map((interest) => (
                <li key={interest} className={styles.interest}>
                  {interest}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles.actions}>
          {!isOwnProfile ? (
            <Button variant="outline" iconLeft={<Icon name="mail" size={16} />}>
              Mensagem
            </Button>
          ) : null}
          {isOwnProfile ? (
            <Button
              type="button"
              variant="primary"
              iconLeft={<Icon name="sparkle" size={16} />}
              onClick={onEdit}
            >
              Editar perfil
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
