import CategoryTag from "../ui/CategoryTag.jsx";
import RecommendationBadge from "../ui/RecommendationBadge.jsx";
import styles from "./PostCard.module.css";

function PostCard({ post, canManage = false, onEdit, onDelete }) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            <CategoryTag categoryId={post.category} />
            {canManage && post.isPrivate ? (
              <span className={styles.privateBadge}>Privado</span>
            ) : null}
          </div>
          <span className={styles.date}>{post.postedAt}</span>
        </div>

        <h3 className={styles.title}>{post.title}</h3>
        {post.subtitle && <p className={styles.subtitle}>{post.subtitle}</p>}

        <div className={styles.ratingRow}>
          <RecommendationBadge rating={post.rating} />
        </div>

        <footer className={styles.actions}>
          <button className={styles.actionButton} type="button">
            Compartilhar
          </button>
          {canManage ? (
            <>
              <button
                className={styles.actionButton}
                type="button"
                onClick={() => onEdit?.(post)}
              >
                Editar
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                type="button"
                onClick={() => onDelete?.(post)}
              >
                Deletar
              </button>
            </>
          ) : (
            <button className={styles.actionButton} type="button">
              Salvar
            </button>
          )}
        </footer>
      </div>
    </article>
  );
}

export default PostCard;
