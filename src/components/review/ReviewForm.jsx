import { useState } from 'react';
import Button from '../ui/Button.jsx';
import { MEDIA_CATEGORIES, RECOMMENDATION_TYPES } from '../../data/mockData.js';
import styles from './ReviewForm.module.css';

const MAX_REVIEW_LENGTH = 1902;

const toneClassMap = {
  positive: styles.optionPositive,
  neutral: styles.optionNeutral,
  negative: styles.optionNegative
};

function ReviewForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(MEDIA_CATEGORIES[0].id);
  const [recommendation, setRecommendation] = useState('');
  const [body, setBody] = useState('');

  const remainingCharacters = MAX_REVIEW_LENGTH - body.length;
  const isOverLimit = remainingCharacters < 0;
  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && !isOverLimit;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ title, category, recommendation, body });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1>Nova review</h1>
        <p>Compartilhe com seus amigos o que você anda consumindo.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="review-title">Mídia (obra)</label>
          <input
            id="review-title"
            className={styles.input}
            type="text"
            placeholder="Ex: Neuromancer — William Gibson"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="review-category">Categoria</label>
          <select
            id="review-category"
            className={styles.input}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {MEDIA_CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Recomendação</label>
        <div className={styles.recommendationRow}>
          {RECOMMENDATION_TYPES.map((item) => {
            const isSelected = recommendation === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRecommendation(isSelected ? '' : item.id)}
                className={`${styles.option} ${toneClassMap[item.tone]} ${
                  isSelected ? styles.optionSelected : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="review-body">Sua review</label>
        <textarea
          id="review-body"
          className={styles.textarea}
          placeholder="O que você achou? Do que gostou? Do que não gostou?"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={10}
        />
        <div
          className={`${styles.counter} ${isOverLimit ? styles.counterOver : ''}`}
          aria-live="polite"
        >
          {remainingCharacters} caracteres restantes
        </div>
      </div>

      <footer className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={!canSubmit}>
          Publicar review
        </Button>
      </footer>
    </form>
  );
}

export default ReviewForm;
