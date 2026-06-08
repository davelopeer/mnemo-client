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

function ReviewForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  errorMessage = '',
  mode = 'create',
  initialValues = null
}) {
  const isEdit = mode === 'edit';
  const [title, setTitle] = useState(initialValues?.mediaTitle ?? '');
  const [mediaAuthor, setMediaAuthor] = useState(initialValues?.mediaAuthor ?? '');
  const [mediaYear, setMediaYear] = useState(
    initialValues?.mediaYear != null ? String(initialValues.mediaYear) : ''
  );
  const [category, setCategory] = useState(initialValues?.category ?? MEDIA_CATEGORIES[0].id);
  const [recommendation, setRecommendation] = useState(initialValues?.recommendation ?? '');
  const [body, setBody] = useState(initialValues?.body ?? '');
  const [photo, setPhoto] = useState(null);

  const remainingCharacters = MAX_REVIEW_LENGTH - body.length;
  const isOverLimit = remainingCharacters < 0;
  const canSubmit =
    title.trim().length > 0 &&
    mediaAuthor.trim().length > 0 &&
    mediaYear.trim().length > 0 &&
    recommendation.trim().length > 0 &&
    body.trim().length > 0 &&
    (isEdit || Boolean(photo)) &&
    !isOverLimit &&
    !isSubmitting;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      mediaTitle: title,
      mediaAuthor,
      mediaYear,
      category,
      recommendation,
      body,
      photo
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1>{isEdit ? 'Editar review' : 'Nova review'}</h1>
        <p>
          {isEdit
            ? 'Atualize os detalhes da sua review.'
            : 'Compartilhe com seus amigos o que você anda consumindo.'}
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="review-title">Mídia (obra)</label>
          <input
            id="review-title"
            className={styles.input}
            type="text"
            placeholder="Ex: Neuromancer"
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

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="review-author">Autor da obra</label>
          <input
            id="review-author"
            className={styles.input}
            type="text"
            placeholder="Ex: William Gibson"
            value={mediaAuthor}
            onChange={(event) => setMediaAuthor(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="review-year">Ano da obra</label>
          <input
            id="review-year"
            className={styles.input}
            type="number"
            inputMode="numeric"
            placeholder="Ex: 1984"
            value={mediaYear}
            onChange={(event) => setMediaYear(event.target.value)}
          />
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
        <label htmlFor="review-photo">Foto da review</label>
        <input
          id="review-photo"
          className={styles.input}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
        />
        <p className={styles.helperText}>
          {isEdit
            ? 'Opcional. Envie uma nova imagem para substituir a atual. JPG, PNG ou WEBP com até 5 MB.'
            : 'Obrigatória. Use JPG, PNG ou WEBP com até 5 MB.'}
        </p>
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

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}

      <footer className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={!canSubmit}>
          {isEdit
            ? isSubmitting
              ? 'Salvando...'
              : 'Salvar alterações'
            : isSubmitting
              ? 'Publicando...'
              : 'Publicar review'}
        </Button>
      </footer>
    </form>
  );
}

export default ReviewForm;
