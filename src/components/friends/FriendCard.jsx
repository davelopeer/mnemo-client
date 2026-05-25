import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import styles from './FriendCard.module.css';

function FriendCard({ friend }) {
  return (
    <article className={styles.card}>
      <Avatar src={friend.avatarUrl} alt={friend.name} size="lg" />
      <div className={styles.info}>
        <h3 className={styles.name}>{friend.name}</h3>
        <span className={styles.nickname}>{friend.nickname}</span>
        <span className={styles.mutual}>{friend.mutualCount} amigos em comum</span>

        <ul className={styles.interests}>
          {friend.sharedInterests.map((interest) => (
            <li key={interest} className={styles.interest}>
              {interest}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" size="sm">
          Ver perfil
        </Button>
        <Button variant="ghost" size="sm">
          Mensagem
        </Button>
      </div>
    </article>
  );
}

export default FriendCard;
