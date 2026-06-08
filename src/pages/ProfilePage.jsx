import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resolveApiAssetUrl } from '../api/client.js';
import * as profileApi from '../api/profile.js';
import * as reviewsApi from '../api/reviews.js';
import { useAuth } from '../auth/AuthContext.jsx';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import PostCard from '../components/feed/PostCard.jsx';
import ReviewForm from '../components/review/ReviewForm.jsx';
import { currentUser, MEDIA_CATEGORIES } from '../data/mockData.js';
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

const relativeTimeFormatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

function formatPostedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const ranges = [
    { limit: 60, unit: 'second', seconds: 1 },
    { limit: 3600, unit: 'minute', seconds: 60 },
    { limit: 86400, unit: 'hour', seconds: 3600 },
    { limit: 2592000, unit: 'day', seconds: 86400 },
    { limit: 31536000, unit: 'month', seconds: 2592000 },
    { limit: Infinity, unit: 'year', seconds: 31536000 }
  ];
  const range = ranges.find((item) => Math.abs(diffSeconds) < item.limit);

  return relativeTimeFormatter.format(Math.round(diffSeconds / range.seconds), range.unit);
}

function reviewToPost(review) {
  const workMetadata = [review.mediaAuthor, review.mediaYear].filter(Boolean).join(', ');

  return {
    id: review.id,
    author: {
      name: review.author.displayName,
      nickname: review.author.username ? `@${review.author.username}` : 'Username ainda não definido',
      avatarUrl: resolveApiAssetUrl(review.author.profileImageUrl)
    },
    category: review.category,
    title: review.mediaTitle,
    subtitle: workMetadata || review.mediaSubtitle || '',
    coverUrl: resolveApiAssetUrl(review.photoUrl),
    recommendation: review.recommendation,
    postedAt: formatPostedAt(review.createdAt),
    body: review.body,
    editValues: {
      mediaTitle: review.mediaTitle,
      mediaAuthor: review.mediaAuthor,
      mediaYear: review.mediaYear,
      category: review.category,
      recommendation: review.recommendation,
      body: review.body
    }
  };
}

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const isOwnProfile = !username;

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setStatus('loading');
      setErrorMessage('');

      try {
        const [profileData, reviewsData] = username
          ? await Promise.all([
              profileApi.getProfileByUsername(username),
              reviewsApi.getProfileReviews(username)
            ])
          : await Promise.all([profileApi.getMyProfile(token), reviewsApi.getMyProfileReviews(token)]);

        if (isMounted) {
          setProfile(profileData);
          setReviews((reviewsData.items ?? []).map(reviewToPost));
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

  const handleDeletePost = async (post) => {
    if (deletingId) {
      return;
    }
    const confirmed = window.confirm('Tem certeza que deseja deletar esta review? Essa ação não pode ser desfeita.');
    if (!confirmed) {
      return;
    }

    setDeletingId(post.id);
    try {
      await reviewsApi.deleteReview(token, post.id);
      setReviews((previous) => previous.filter((item) => item.id !== post.id));
    } catch (error) {
      window.alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditPost = (post) => {
    setEditErrorMessage('');
    setEditingPost(post);
  };

  const handleCloseEdit = () => {
    if (isSubmittingEdit) {
      return;
    }
    setEditingPost(null);
    setEditErrorMessage('');
  };

  const handleSubmitEdit = async (payload) => {
    if (!editingPost) {
      return;
    }
    setIsSubmittingEdit(true);
    setEditErrorMessage('');
    try {
      const updated = await reviewsApi.updateReview(token, editingPost.id, payload);
      const updatedPost = reviewToPost(updated);
      setReviews((previous) =>
        previous.map((item) => (item.id === updatedPost.id ? updatedPost : item))
      );
      setEditingPost(null);
    } catch (error) {
      setEditErrorMessage(error.message);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

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
        <>
          {reviews.length > 0 ? (
            <section className={styles.posts}>
              {reviews.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  canManage={isOwnProfile}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))}
            </section>
          ) : (
            <section className={styles.emptyState}>
              <h3>Nenhuma review por aqui ainda.</h3>
              <p>
                {isOwnProfile
                  ? 'Publique sua primeira review para montar seu histórico.'
                  : 'Este perfil ainda não publicou reviews.'}
              </p>
            </section>
          )}
        </>
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

      {editingPost && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={handleCloseEdit}
        >
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <ReviewForm
              mode="edit"
              initialValues={editingPost.editValues}
              onSubmit={handleSubmitEdit}
              onCancel={handleCloseEdit}
              isSubmitting={isSubmittingEdit}
              errorMessage={editErrorMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
