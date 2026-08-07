import { MEDIA_CATEGORIES } from "../../data/mockData.js";
import styles from "./CategoryTag.module.css";

function CategoryTag({ categoryId }) {
  const category = MEDIA_CATEGORIES.find((item) => item.id === categoryId);
  if (!category) return null;

  return (
    <span className={styles.tag} style={{ backgroundColor: category.color }}>
      {category.label}
    </span>
  );
}

export default CategoryTag;
