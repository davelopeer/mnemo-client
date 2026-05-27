import styles from './Avatar.module.css';

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl
};

function Avatar({ src, alt, size = 'md', ring = false }) {
  const composedClassName = [styles.avatar, sizeClassMap[size], ring ? styles.ring : '']
    .filter(Boolean)
    .join(' ');
  const initial = alt?.trim().charAt(0).toUpperCase() || '?';

  return (
    <span className={composedClassName}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <span aria-label={alt} className={styles.initial} role="img">
          {initial}
        </span>
      )}
    </span>
  );
}

export default Avatar;
