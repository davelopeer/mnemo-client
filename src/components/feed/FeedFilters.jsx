import Checkbox from '../ui/Checkbox.jsx';
import Icon from '../ui/Icon.jsx';
import { MEDIA_CATEGORIES } from '../../data/mockData.js';
import styles from './FeedFilters.module.css';

function FeedFilters({ selectedCategories, onToggleCategory }) {
  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <Icon name="filter" size={16} />
        <h3>Filtros</h3>
      </header>

      <section className={styles.group}>
        <h4 className={styles.groupTitle}>Temas</h4>
        <div className={styles.options}>
          {MEDIA_CATEGORIES.map((category) => (
            <Checkbox
              key={category.id}
              label={category.label}
              checked={selectedCategories.includes(category.id)}
              onChange={() => onToggleCategory(category.id)}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}

export default FeedFilters;
