import styles from './Checkbox.module.css';

function Checkbox({ label, checked, onChange, name }) {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={styles.input}
      />
      <span className={styles.box} aria-hidden="true">
        <svg viewBox="0 0 16 16" className={styles.check}>
          <path d="M3.5 8.5l3 3 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
