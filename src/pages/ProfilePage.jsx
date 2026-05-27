import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resolveApiAssetUrl } from '../api/client.js';
import * as profileApi from '../api/profile.js';
import { useAuth } from '../auth/AuthContext.jsx';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import PostCard from '../components/feed/PostCard.jsx';
import { currentUser, userPosts, MEDIA_CATEGORIES } from '../data/mockData.js';
import styles from './ProfilePage.module.css';

const profileTabs = [
  { id: 'posts', label: 'Reviews' },
  { id: 'about', label: 'Sobre' },
  { id: 'collections', label: 'Coleções' }
];

function profileToUser(profile, fallbackUser) {
  const usernameLabel = profile.username ? `@${profile.username}` : 'Username ainda não definido';

  return {
    ...fallbackUser,
    id: profile.id,
    name: profile.displayName,
    nickname: usernameLabel,
    avatarUrl: resolveApiAssetUrl(profile.profileImageUrl),
    bio: profile.description ?? 'Esse perfil ainda não tem descrição.',
    interests: fallbackUser.interests
  };
}

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const isOwnProfile = !username;

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setStatus('loading');
      setErrorMessage('');

      try {
        const data = username
          ? await profileApi.getProfileByUsername(username)
          : await profileApi.getMyProfile(token);

        if (isMounted) {
          setProfile(data);
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
          setErrorMessage(error.message);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [token, username]);

  const fallbackUser = useMemo(
    () =>
      user
        ? {
            ...currentUser,
            name: `${user.firstName} ${user.lastName}`,
            nickname: user.email
          }
        : currentUser,
    [user]
  );
  const pageUser = profile ? profileToUser(profile, fallbackUser) : fallbackUser;
  const pageClassName = `${styles.page} ${username ? styles.publicPage : ''}`;

  if (status === 'loading') {
    return (
      <section className={`${styles.emptyState} ${username ? styles.publicPage : ''}`} aria-live="polite">
        <h3>Carregando perfil...</h3>
        <p>Estamos buscando as informações mais recentes.</p>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className={`${styles.emptyState} ${username ? styles.publicPage : ''}`} aria-live="assertive">
        <h3>{username ? 'Perfil não encontrado.' : 'Não foi possível carregar seu perfil.'}</h3>
        <p>{errorMessage}</p>
      </section>
    );
  }

  return (
    <div className={pageClassName}>
      <ProfileHeader
        user={pageUser}
        isOwnProfile={isOwnProfile}
        onEdit={() => navigate('/profile/edit')}
      />

      <nav className={styles.tabs} aria-label="Seções do perfil">
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'posts' && (
        <section className={styles.posts}>
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}

      {activeTab === 'about' && (
        <section className={styles.about}>
          <article>
            <h3>Interesses</h3>
            <ul className={styles.interestList}>
              {MEDIA_CATEGORIES.map((item) => (
                <li
                  key={item.id}
                  className={
                    pageUser.interests.includes(item.label) ? styles.interestActive : ''
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Bio</h3>
            <p>{pageUser.bio}</p>
          </article>
        </section>
      )}

      {activeTab === 'collections' && (
        <section className={styles.emptyState}>
          <h3>Coleções chegam em breve.</h3>
          <p>Você poderá agrupar reviews em temas — tipo “cyberpunk dos anos 80”.</p>
        </section>
      )}
    </div>
  );
}

export default ProfilePage;
