import { useMemo, useState } from 'react';
import PostCard from '../components/feed/PostCard.jsx';
import FeedFilters from '../components/feed/FeedFilters.jsx';
import { feedPosts, MEDIA_CATEGORIES, RECOMMENDATION_TYPES } from '../data/mockData.js';
import styles from './HomePage.module.css';

const allCategoryIds = MEDIA_CATEGORIES.map((item) => item.id);
const allRecommendationIds = RECOMMENDATION_TYPES.map((item) => item.id);

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState(allCategoryIds);
  const [selectedRecommendations, setSelectedRecommendations] = useState(allRecommendationIds);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((previous) =>
      previous.includes(categoryId)
        ? previous.filter((id) => id !== categoryId)
        : [...previous, categoryId]
    );
  };

  const toggleRecommendation = (recommendationId) => {
    setSelectedRecommendations((previous) =>
      previous.includes(recommendationId)
        ? previous.filter((id) => id !== recommendationId)
        : [...previous, recommendationId]
    );
  };

  const visiblePosts = useMemo(() => {
    return feedPosts.filter(
      (post) =>
        selectedCategories.includes(post.category) &&
        selectedRecommendations.includes(post.recommendation)
    );
  }, [selectedCategories, selectedRecommendations]);

  return (
    <div className={styles.layout}>
      <section className={styles.feed}>
        <header className={styles.feedHeader}>
          <div>
            <h1>Seu feed</h1>
            <p>O que seus amigos andam lendo, vendo e jogando.</p>
          </div>
          <span className={styles.feedCount}>
            {visiblePosts.length} {visiblePosts.length === 1 ? 'post' : 'posts'}
          </span>
        </header>

        <div className={styles.posts}>
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className={styles.empty}>
              <h3>Nenhum post bate com esses filtros.</h3>
              <p>Tente reativar algumas categorias ou tipos de review.</p>
            </div>
          )}
        </div>
      </section>

      <FeedFilters
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        selectedRecommendations={selectedRecommendations}
        onToggleRecommendation={toggleRecommendation}
      />
    </div>
  );
}

export default HomePage;
