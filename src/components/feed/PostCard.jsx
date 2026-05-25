import Avatar from '../ui/Avatar.jsx';
import CategoryTag from '../ui/CategoryTag.jsx';
import RecommendationBadge from '../ui/RecommendationBadge.jsx';
import styles from './PostCard.module.css';

function PostCard({ post }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Avatar src={post.author.avatarUrl} alt={post.author.name} size="md" />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{post.author.name}</span>
          <span className={styles.authorMeta}>
            {post.author.nickname} · {post.postedAt}
          </span>
        </div>
        <CategoryTag categoryId={post.category} />
      </header>

      <div className={styles.media}>
        <img src={post.coverUrl} alt={post.title} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.subtitle}>{post.subtitle}</p>
          </div>
          <RecommendationBadge recommendationId={post.recommendation} />
        </div>

        <p className={styles.body}>{post.body}</p>

        <footer className={styles.actions}>
          <button className={styles.actionButton} type="button">
            Comentar
          </button>
          <button className={styles.actionButton} type="button">
            Compartilhar
          </button>
          <button className={styles.actionButton} type="button">
            Salvar
          </button>
        </footer>
      </div>
    </article>
  );
}

export default PostCard;
