import { useState } from 'react';
import Button from '../ui/Button.jsx';
import StarRating from '../ui/StarRating.jsx';
import { MEDIA_CATEGORIES } from '../../data/mockData.js';
import styles from './ReviewForm.module.css';

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
  const [rating, setRating] = useState(initialValues?.rating ?? 0);

  const canSubmit =
    title.trim().length > 0 &&
    mediaAuthor.trim().length > 0 &&
    mediaYear.trim().length > 0 &&
    rating > 0 &&
    !isSubmitting;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      mediaTitle: title,
      mediaAuthor,
      mediaYear,
      category,
      rating
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1>{isEdit ? 'Editar Finis' : 'Novo Finis'}</h1>
        <p>
          {isEdit
            ? 'Atualize os detalhes do seu Finis.'
            : 'Registre uma obra que você finalizou.'}
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
        <label>Nota</label>
        <div className={styles.ratingRow}>
          <StarRating value={rating} onChange={setRating} size="lg" />
          {rating > 0 && (
            <span className={styles.ratingLabel}>{rating} / 5</span>
          )}
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
              : 'Finis'}
        </Button>
      </footer>
    </form>
  );
}

export default ReviewForm;
