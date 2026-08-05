import { useState } from 'react';
import styles from './StarRating.module.css';

function StarRating({ value = 0, onChange, readOnly = false, size = 'md' }) {
  const [hovered, setHovered] = useState(null);
  const displayed = hovered ?? value;

  const handleMouseLeave = () => {
    if (!readOnly) setHovered(null);
  };

  return (
    <div
      className={`${styles.stars} ${styles[`size-${size}`]}`}
      onMouseLeave={handleMouseLeave}
      role={readOnly ? undefined : 'group'}
      aria-label={readOnly ? `${value} de 5 estrelas` : 'Nota'}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = displayed >= star ? 'full' : displayed >= star - 0.5 ? 'half' : 'empty';
        return (
          <span key={star} className={styles.slot}>
            {!readOnly && (
              <>
                <span
                  className={styles.halfZone}
                  onMouseEnter={() => setHovered(star - 0.5)}
                  onClick={() => onChange?.(value === star - 0.5 ? 0 : star - 0.5)}
                  aria-label={`${star - 0.5} estrelas`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onChange?.(value === star - 0.5 ? 0 : star - 0.5)}
                />
                <span
                  className={styles.fullZone}
                  onMouseEnter={() => setHovered(star)}
                  onClick={() => onChange?.(value === star ? 0 : star)}
                  aria-label={`${star} estrelas`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onChange?.(value === star ? 0 : star)}
                />
              </>
            )}
            <span className={`${styles.star} ${styles[fill]}`} aria-hidden="true">★</span>
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
