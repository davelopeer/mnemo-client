import { useMemo, useState } from 'react';
import FriendCard from '../components/friends/FriendCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import { friends } from '../data/mockData.js';
import styles from './FriendsPage.module.css';

function FriendsPage() {
  const [query, setQuery] = useState('');

  const filteredFriends = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return friends;

    return friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(normalizedQuery) ||
        friend.nickname.toLowerCase().includes(normalizedQuery) ||
        friend.id.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Seus amigos</h1>
          <p>Gente com quem você divide gostos culturais.</p>
        </div>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>
          Convidar amigos
        </Button>
      </header>

      <div className={styles.searchRow}>
        <div className={styles.searchInput}>
          <Icon name="search" size={18} />
          <input
            type="text"
            placeholder="Buscar por nickname ou id (ex: @rafa, f-01)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <span className={styles.count}>
          {filteredFriends.length} {filteredFriends.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      <div className={styles.list}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <div className={styles.empty}>
            <h3>Nenhum amigo encontrado.</h3>
            <p>Tente outro nickname ou id.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendsPage;
