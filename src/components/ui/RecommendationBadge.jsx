import { RECOMMENDATION_TYPES } from '../../data/mockData.js';
import styles from './RecommendationBadge.module.css';

const toneClassMap = {
  positive: styles.positive,
  neutral: styles.neutral,
  negative: styles.negative
};

function RecommendationBadge({ recommendationId }) {
  const recommendation = RECOMMENDATION_TYPES.find((item) => item.id === recommendationId);
  if (!recommendation) return null;

  return (
    <span className={`${styles.badge} ${toneClassMap[recommendation.tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {recommendation.label}
    </span>
  );
}

export default RecommendationBadge;
