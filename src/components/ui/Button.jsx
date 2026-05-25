import styles from './Button.module.css';

const variantClassMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  outline: styles.outline
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg
};

function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const composedClassName = [
    styles.button,
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? styles.fullWidth : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={composedClassName} {...rest}>
      {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
    </button>
  );
}

export default Button;
