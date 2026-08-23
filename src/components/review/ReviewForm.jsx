import { useState } from "react";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import StarRating from "../ui/StarRating.jsx";
import { MEDIA_CATEGORIES } from "../../data/mockData.js";
import { todayISODate } from "../../utils/reviewPost.js";
import styles from "./ReviewForm.module.css";

export const MAX_REVIEW_DESCRIPTION_LENGTH = 1902;

function ReviewForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  errorMessage = "",
  mode = "create",
  initialValues = null,
  categories = MEDIA_CATEGORIES,
}) {
  const isEdit = mode === "edit";
  const availableCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : MEDIA_CATEGORIES;
  const [title, setTitle] = useState(initialValues?.mediaTitle ?? "");
  const [mediaAuthor, setMediaAuthor] = useState(
    initialValues?.mediaAuthor ?? "",
  );
  const [mediaYear, setMediaYear] = useState(
    initialValues?.mediaYear ? String(initialValues.mediaYear) : "",
  );
  const [category, setCategory] = useState(() => {
    const initialCategory = initialValues?.category;
    if (
      initialCategory &&
      availableCategories.some((item) => item.id === initialCategory)
    ) {
      return initialCategory;
    }
    return availableCategories[0].id;
  });
  const [rating, setRating] = useState(initialValues?.rating ?? 0);
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [finishedAt, setFinishedAt] = useState(
    initialValues?.finishedAt || todayISODate(),
  );
  const [isPrivate, setIsPrivate] = useState(initialValues?.isPrivate ?? false);

  const descriptionLength = [...description].length;
  const remainingCharacters = MAX_REVIEW_DESCRIPTION_LENGTH - descriptionLength;
  const canSubmit =
    title.trim().length > 0 &&
    rating > 0 &&
    finishedAt &&
    remainingCharacters >= 0 &&
    !isSubmitting;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      mediaTitle: title,
      mediaAuthor: mediaAuthor.trim(),
      mediaYear: mediaYear.trim(),
      category,
      rating,
      description,
      finishedAt,
      isPrivate,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1>{isEdit ? "Editar Finis" : "Novo Finis"}</h1>
        <p>
          {isEdit
            ? "Atualize os detalhes do seu Finis."
            : "Registre uma obra que você finalizou."}
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
            {availableCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="review-author">Autor/produtora</label>
          <input
            id="review-author"
            className={styles.input}
            type="text"
            placeholder="Ex: William Gibson (opcional)"
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
            placeholder="Ex: 1984 (opcional)"
            value={mediaYear}
            onChange={(event) => setMediaYear(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="review-finished-at">Data de término</label>
        <input
          id="review-finished-at"
          className={styles.input}
          type="date"
          value={finishedAt}
          onChange={(event) => setFinishedAt(event.target.value)}
        />
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

      <div className={styles.field}>
        <label htmlFor="review-description">Descrição / opinião</label>
        <textarea
          id="review-description"
          className={styles.textarea}
          rows={6}
          maxLength={MAX_REVIEW_DESCRIPTION_LENGTH}
          placeholder="O que você achou desta obra?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div
          className={`${styles.counter} ${remainingCharacters < 0 ? styles.counterOver : ""}`}
        >
          {remainingCharacters} caracteres restantes
        </div>
      </div>

      <button
        type="button"
        className={styles.privacyToggle}
        onClick={() => setIsPrivate((prev) => !prev)}
        aria-pressed={isPrivate}
        aria-label={isPrivate ? "Finis privado" : "Finis público"}
      >
        <Icon name={isPrivate ? "eyeOff" : "eye"} size={18} />
        <span>{isPrivate ? "Privado" : "Público"}</span>
      </button>

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}

      <footer className={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={!canSubmit}>
          {isEdit
            ? isSubmitting
              ? "Salvando..."
              : "Salvar alterações"
            : isSubmitting
              ? "Publicando..."
              : "Finis"}
        </Button>
      </footer>
    </form>
  );
}

export default ReviewForm;
