import { useCallback, useEffect, useMemo, useState } from 'react';
import { resolveApiAssetUrl } from '../api/client.js';
import * as friendsApi from '../api/friends.js';
import { useAuth } from '../auth/AuthContext.jsx';
import FriendCard from '../components/friends/FriendCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import styles from './FriendsPage.module.css';

const friendsTabs = [
  { id: 'friends', label: 'Lista de amigos' },
  { id: 'discover', label: 'Buscar e convites' }
];

function normalizeProfileImage(profile) {
  return {
    ...profile,
    profileImageUrl: resolveApiAssetUrl(profile.profileImageUrl)
  };
}

function FriendsPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsQuery, setFriendsQuery] = useState('');
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingPending, setIsLoadingPending] = useState(false);
  const [hasLoadedPending, setHasLoadedPending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [actionKey, setActionKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadFriends = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoadingFriends(true);
    try {
      const response = await friendsApi.listFriends(token);
      setFriends(response.items.map((item) => ({
        ...item,
        profile: normalizeProfileImage(item.profile)
      })));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingFriends(false);
    }
  }, [token]);

  const loadPendingRequests = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoadingPending(true);
    try {
      const response = await friendsApi.listPendingRequests(token);
      setPendingRequests(response.items.map((item) => ({
        ...item,
        profile: normalizeProfileImage(item.profile)
      })));
      setHasLoadedPending(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingPending(false);
    }
  }, [token]);

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  useEffect(() => {
    if (activeTab === 'discover' && !hasLoadedPending) {
      loadPendingRequests();
    }
  }, [activeTab, hasLoadedPending, loadPendingRequests]);

  useEffect(() => {
    if (activeTab !== 'discover' || !token) {
      return undefined;
    }

    const normalizedQuery = searchQuery.trim();
    if (normalizedQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return undefined;
    }

    setIsSearching(true);
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await friendsApi.searchUsers(token, normalizedQuery);
        setSearchResults(response.items.map((item) => ({
          ...item,
          profile: normalizeProfileImage(item.profile)
        })));
        setErrorMessage('');
      } catch (error) {
        setSearchResults([]);
        setErrorMessage(error.message);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab, searchQuery, token]);

  const filteredFriends = useMemo(() => {
    const normalizedQuery = friendsQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return friends;
    }

    return friends.filter((friend) => {
      const displayName = friend.profile.displayName?.toLowerCase() ?? '';
      const username = friend.profile.username?.toLowerCase() ?? '';
      return displayName.includes(normalizedQuery) || username.includes(normalizedQuery);
    });
  }, [friends, friendsQuery]);

  async function handleAddFriend(username) {
    if (!token || !username) {
      return;
    }

    setActionKey(`add:${username}`);
    setErrorMessage('');
    try {
      await friendsApi.sendFriendRequest(token, username);
      const response = await friendsApi.searchUsers(token, username);
      setSearchResults(response.items.map((item) => ({
        ...item,
        profile: normalizeProfileImage(item.profile)
      })));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setActionKey(null);
    }
  }

  async function handleAcceptFriend(requestId) {
    if (!token || !requestId) {
      return;
    }

    setActionKey(`accept:${requestId}`);
    setErrorMessage('');
    try {
      await friendsApi.acceptFriendRequest(token, requestId);
      await Promise.all([loadFriends(), loadPendingRequests()]);
      if (activeTab === 'discover' && searchQuery.trim().length >= 2) {
        const response = await friendsApi.searchUsers(token, searchQuery.trim());
        setSearchResults(response.items.map((item) => ({
          ...item,
          profile: normalizeProfileImage(item.profile)
        })));
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setActionKey(null);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Seus amigos</h1>
          <p>Gente com quem voce divide gostos culturais.</p>
        </div>
      </header>

      {errorMessage ? (
        <div className={styles.error} role="alert">
          {errorMessage}
        </div>
      ) : null}

      <nav className={styles.tabs} aria-label="Secoes de amigos">
        {friendsTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {tab.label}
            {tab.id === 'discover' && pendingRequests.length > 0 ? (
              <span className={styles.tabBadge}>{pendingRequests.length}</span>
            ) : null}
          </button>
        ))}
      </nav>

      {activeTab === 'friends' && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Lista de amigos</h2>
            <p>{friends.length} {friends.length === 1 ? 'amigo' : 'amigos'}</p>
          </div>

          <div className={styles.searchRow}>
            <div className={styles.searchInput}>
              <Icon name="search" size={18} />
              <input
                type="text"
                placeholder="Filtrar seus amigos"
                value={friendsQuery}
                onChange={(event) => setFriendsQuery(event.target.value)}
              />
            </div>
            <span className={styles.count}>
              {filteredFriends.length} {filteredFriends.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>

          <div className={styles.list}>
            {isLoadingFriends ? (
              <div className={styles.emptyHint}>
                <p>Carregando amigos...</p>
              </div>
            ) : filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <FriendCard key={friend.friendshipId} profile={friend.profile} variant="friend" />
              ))
            ) : (
              <div className={styles.empty}>
                <h3>Nenhum amigo encontrado.</h3>
                <p>Busque pessoas na aba ao lado para comecar a montar sua rede.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'discover' && (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Buscar pessoas</h2>
              <p>Encontre usuarios pelo username para adicionar ou ver o perfil.</p>
            </div>

            <div className={styles.searchRow}>
              <div className={styles.searchInput}>
                <Icon name="search" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por username (ex: rafa)"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <span className={styles.count}>
                {isSearching
                  ? 'Buscando...'
                  : `${searchResults.length} ${searchResults.length === 1 ? 'resultado' : 'resultados'}`}
              </span>
            </div>

            <div className={styles.list}>
              {searchQuery.trim().length >= 2 ? (
                searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <FriendCard
                      key={item.profile.userId}
                      profile={item.profile}
                      relationshipStatus={item.relationshipStatus}
                      requestId={item.requestId}
                      variant="search"
                      isActionLoading={actionKey === `add:${item.profile.username}` || actionKey === `accept:${item.requestId}`}
                      onAddFriend={handleAddFriend}
                      onAcceptFriend={handleAcceptFriend}
                    />
                  ))
                ) : (
                  !isSearching && (
                    <div className={styles.empty}>
                      <h3>Nenhum usuario encontrado.</h3>
                      <p>Tente outro username.</p>
                    </div>
                  )
                )
              ) : (
                <div className={styles.emptyHint}>
                  <p>Digite pelo menos 2 caracteres para buscar usuarios.</p>
                </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Solicitacoes pendentes</h2>
              <p>Pessoas que querem ser suas amigas.</p>
            </div>

            <div className={styles.list}>
              {isLoadingPending ? (
                <div className={styles.emptyHint}>
                  <p>Carregando solicitacoes...</p>
                </div>
              ) : pendingRequests.length > 0 ? (
                pendingRequests.map((item) => (
                  <FriendCard
                    key={item.requestId}
                    profile={item.profile}
                    relationshipStatus="pending_received"
                    requestId={item.requestId}
                    variant="search"
                    isActionLoading={actionKey === `accept:${item.requestId}`}
                    onAcceptFriend={handleAcceptFriend}
                  />
                ))
              ) : (
                <div className={styles.empty}>
                  <h3>Nenhuma solicitacao pendente.</h3>
                  <p>Quando alguem te adicionar, aparecera aqui.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default FriendsPage;
