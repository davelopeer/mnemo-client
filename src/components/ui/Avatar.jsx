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

  return (
    <span className={composedClassName}>
      <img src={src} alt={alt} />
    </span>
  );
}

export default Avatar;
