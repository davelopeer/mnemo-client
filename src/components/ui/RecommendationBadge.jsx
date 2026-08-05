import StarRating from './StarRating.jsx';
import styles from './RecommendationBadge.module.css';

function RecommendationBadge({ rating }) {
  if (!rating || rating <= 0) return null;

  return (
    <span className={styles.badge} aria-label={`${rating} de 5 estrelas`}>
      <StarRating value={rating} readOnly size="sm" />
    </span>
  );
}

export default RecommendationBadge;
