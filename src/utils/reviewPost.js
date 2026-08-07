import { resolveApiAssetUrl } from "../api/client.js";

export function formatPostedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const currentYear = new Date().getFullYear();
  const options =
    date.getFullYear() === currentYear
      ? { day: "numeric", month: "long" }
      : { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("pt-BR", options);
}

export function reviewToPost(review) {
  const workMetadata = [review.mediaAuthor, review.mediaYear]
    .filter(Boolean)
    .join(", ");

  return {
    id: review.id,
    author: {
      name: review.author.displayName,
      nickname: review.author.username
        ? `@${review.author.username}`
        : "Username ainda não definido",
      avatarUrl: resolveApiAssetUrl(review.author.profileImageUrl),
    },
    category: review.category,
    title: review.mediaTitle,
    subtitle: workMetadata || review.mediaSubtitle || "",
    rating: review.rating,
    isPrivate: Boolean(review.isPrivate),
    postedAt: formatPostedAt(review.createdAt),
    editValues: {
      mediaTitle: review.mediaTitle,
      mediaAuthor: review.mediaAuthor,
      mediaYear: review.mediaYear,
      category: review.category,
      rating: review.rating,
      isPrivate: Boolean(review.isPrivate),
    },
  };
}
