import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resolveApiAssetUrl } from "../api/client.js";
import * as profileApi from "../api/profile.js";
import * as reviewsApi from "../api/reviews.js";
import { useAuth } from "../auth/AuthContext.jsx";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import PostCard from "../components/feed/PostCard.jsx";
import ReviewForm from "../components/review/ReviewForm.jsx";
import { currentUser, MEDIA_CATEGORIES } from "../data/mockData.js";
import { reviewToPost } from "../utils/reviewPost.js";
import styles from "./ProfilePage.module.css";

const profileTabs = [
  { id: "posts", label: "Finis" },
  { id: "about", label: "Sobre" },
  { id: "collections", label: "Coleções" },
];

function profileToUser(profile, fallbackUser) {
  const usernameLabel = profile.username
    ? `@${profile.username}`
    : "Username ainda não definido";

  return {
    ...fallbackUser,
    id: profile.id,
    name: profile.displayName,
    nickname: usernameLabel,
    avatarUrl: resolveApiAssetUrl(profile.profileImageUrl),
    bio: profile.description ?? "Esse perfil ainda não tem descrição.",
    interests: fallbackUser.interests,
  };
}

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [activeFilters, setActiveFilters] = useState([]);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const isOwnProfile = !username;

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const [profileData, reviewsData] = username
          ? await Promise.all([
              profileApi.getProfileByUsername(username),
              reviewsApi.getProfileReviews(username),
            ])
          : await Promise.all([
              profileApi.getMyProfile(token),
              reviewsApi.getMyProfileReviews(token),
            ]);

        if (isMounted) {
          setProfile(profileData);
          setReviews((reviewsData.items ?? []).map(reviewToPost));
          setStatus("success");
        }
      } catch (error) {
        if (isMounted) {
          setStatus("error");
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
    const confirmed = window.confirm(
      "Tem certeza que deseja deletar este Finis? Essa ação não pode ser desfeita.",
    );
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
    setEditErrorMessage("");
    setEditingPost(post);
  };

  const handleCloseEdit = () => {
    if (isSubmittingEdit) {
      return;
    }
    setEditingPost(null);
    setEditErrorMessage("");
  };

  const handleSubmitEdit = async (payload) => {
    if (!editingPost) {
      return;
    }
    setIsSubmittingEdit(true);
    setEditErrorMessage("");
    try {
      const updated = await reviewsApi.updateReview(
        token,
        editingPost.id,
        payload,
      );
      const updatedPost = reviewToPost(updated);
      setReviews((previous) =>
        previous.map((item) =>
          item.id === updatedPost.id ? updatedPost : item,
        ),
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
            nickname: user.email,
          }
        : currentUser,
    [user],
  );
  const pageUser = profile
    ? profileToUser(profile, fallbackUser)
    : fallbackUser;

  const mediaCounts = useMemo(() => {
    const counts = { books: 0, movies: 0, series: 0, games: 0, comics: 0 };
    for (const r of reviews) {
      if (r.category in counts) counts[r.category]++;
    }
    return counts;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (activeFilters.length === 0) return reviews;
    return reviews.filter((r) => activeFilters.includes(r.category));
  }, [reviews, activeFilters]);

  const handleFilterChange = (categoryId) => {
    setActiveFilters((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };
  const pageClassName = `${styles.page} ${username ? styles.publicPage : ""}`;

  if (status === "loading") {
    return (
      <section
        className={`${styles.emptyState} ${username ? styles.publicPage : ""}`}
        aria-live="polite"
      >
        <h3>Carregando perfil...</h3>
        <p>Estamos buscando as informações mais recentes.</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section
        className={`${styles.emptyState} ${username ? styles.publicPage : ""}`}
        aria-live="assertive"
      >
        <h3>
          {username
            ? "Perfil não encontrado."
            : "Não foi possível carregar seu perfil."}
        </h3>
        <p>{errorMessage}</p>
      </section>
    );
  }

  return (
    <div className={pageClassName}>
      <ProfileHeader
        user={pageUser}
        isOwnProfile={isOwnProfile}
        onEdit={() => navigate("/profile/edit")}
        mediaCounts={mediaCounts}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      <nav className={styles.tabs} aria-label="Seções do perfil">
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "posts" && (
        <>
          {filteredReviews.length > 0 ? (
            <section className={styles.posts}>
              {filteredReviews.map((post) => (
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
              {activeFilters.length > 0 ? (
                <>
                  <h3>Nenhum Finis nessa categoria.</h3>
                  <p>Tente selecionar outra mídia ou remova o filtro.</p>
                </>
              ) : (
                <>
                  <h3>Nenhum Finis por aqui ainda.</h3>
                  <p>
                    {isOwnProfile
                      ? "Publique seu primeiro Finis para montar seu histórico."
                      : "Este perfil ainda não publicou nenhum Finis."}
                  </p>
                </>
              )}
            </section>
          )}
        </>
      )}

      {activeTab === "about" && (
        <section className={styles.about}>
          <article>
            <h3>Interesses</h3>
            <ul className={styles.interestList}>
              {MEDIA_CATEGORIES.map((item) => (
                <li
                  key={item.id}
                  className={
                    pageUser.interests.includes(item.label)
                      ? styles.interestActive
                      : ""
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

      {activeTab === "collections" && (
        <section className={styles.emptyState}>
          <h3>Coleções chegam em breve.</h3>
          <p>
            Você poderá agrupar reviews em temas — tipo “cyberpunk dos anos 80”.
          </p>
        </section>
      )}

      {editingPost && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={handleCloseEdit}
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
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
