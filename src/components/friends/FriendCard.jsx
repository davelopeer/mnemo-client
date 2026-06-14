import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import styles from './FriendCard.module.css';

function profileToCardData(profile) {
  const username = profile.username ? `@${profile.username}` : 'Sem username';

  return {
    id: profile.userId,
    name: profile.displayName,
    nickname: username,
    avatarUrl: profile.profileImageUrl,
    username: profile.username
  };
}

function FriendCard({
  profile,
  relationshipStatus,
  requestId,
  onAddFriend,
  onAcceptFriend,
  isActionLoading = false,
  variant = 'friend'
}) {
  const navigate = useNavigate();
  const friend = profileToCardData(profile);

  function handleViewProfile() {
    if (!friend.username) {
      return;
    }
    navigate(`/user/${friend.username}`);
  }

  function renderPrimaryAction() {
    if (variant === 'friend') {
      return null;
    }

    if (relationshipStatus === 'friends') {
      return (
        <Button variant="secondary" size="sm" disabled>
          Ja sao amigos
        </Button>
      );
    }

    if (relationshipStatus === 'pending_sent') {
      return (
        <Button variant="secondary" size="sm" disabled>
          Aguardando aceite
        </Button>
      );
    }

    if (relationshipStatus === 'pending_received') {
      return (
        <Button
          variant="primary"
          size="sm"
          disabled={isActionLoading || !requestId}
          onClick={() => onAcceptFriend?.(requestId)}
        >
          Aceitar amizade
        </Button>
      );
    }

    return (
      <Button
        variant="primary"
        size="sm"
        disabled={isActionLoading || !friend.username}
        onClick={() => onAddFriend?.(friend.username)}
      >
        Adicionar amizade
      </Button>
    );
  }

  return (
    <article className={styles.card}>
      <Avatar src={friend.avatarUrl} alt={friend.name} size="lg" />
      <div className={styles.info}>
        <h3 className={styles.name}>{friend.name}</h3>
        <span className={styles.nickname}>{friend.nickname}</span>
      </div>
      <div className={styles.actions}>
        {renderPrimaryAction()}
        <Button
          variant="secondary"
          size="sm"
          disabled={!friend.username}
          onClick={handleViewProfile}
        >
          Ver perfil
        </Button>
      </div>
    </article>
  );
}

export default FriendCard;
