import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
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
  friendshipId,
  onAddFriend,
  onAcceptFriend,
  onRejectFriend,
  onRemoveFriend,
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

  function renderSecondaryActions() {
    if (variant === 'friend') {
      return (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={styles.iconButton}
          aria-label="Excluir amizade"
          disabled={isActionLoading || !friendshipId}
          onClick={() => onRemoveFriend?.(friendshipId, friend)}
        >
          <Icon name="trash" size={16} />
        </Button>
      );
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
        <>
          <Button
            variant="outline"
            size="sm"
            className={styles.rejectButton}
            disabled={isActionLoading || !requestId}
            onClick={() => onRejectFriend?.(requestId)}
          >
            Rejeitar
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={isActionLoading || !requestId}
            onClick={() => onAcceptFriend?.(requestId)}
          >
            Aceitar amizade
          </Button>
        </>
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
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!friend.username}
          onClick={handleViewProfile}
        >
          Ver perfil
        </Button>
        {renderSecondaryActions()}
      </div>
    </article>
  );
}

export default FriendCard;
