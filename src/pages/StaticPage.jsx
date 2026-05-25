import styles from './StaticPage.module.css';

function StaticPage({ title, subtitle, children }) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

export default StaticPage;
