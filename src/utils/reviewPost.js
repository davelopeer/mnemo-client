import { resolveApiAssetUrl } from '../api/client.js';

const relativeTimeFormatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

export function formatPostedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const ranges = [
    { limit: 60, unit: 'second', seconds: 1 },
    { limit: 3600, unit: 'minute', seconds: 60 },
    { limit: 86400, unit: 'hour', seconds: 3600 },
    { limit: 2592000, unit: 'day', seconds: 86400 },
    { limit: 31536000, unit: 'month', seconds: 2592000 },
    { limit: Infinity, unit: 'year', seconds: 31536000 }
  ];
  const range = ranges.find((item) => Math.abs(diffSeconds) < item.limit);

  return relativeTimeFormatter.format(Math.round(diffSeconds / range.seconds), range.unit);
}

export function reviewToPost(review) {
  const workMetadata = [review.mediaAuthor, review.mediaYear].filter(Boolean).join(', ');

  return {
    id: review.id,
    author: {
      name: review.author.displayName,
      nickname: review.author.username ? `@${review.author.username}` : 'Username ainda não definido',
      avatarUrl: resolveApiAssetUrl(review.author.profileImageUrl)
    },
    category: review.category,
    title: review.mediaTitle,
    subtitle: workMetadata || review.mediaSubtitle || '',
    coverUrl: resolveApiAssetUrl(review.photoUrl, review.updatedAt ?? review.createdAt),
    recommendation: review.recommendation,
    postedAt: formatPostedAt(review.createdAt),
    body: review.body,
    editValues: {
      mediaTitle: review.mediaTitle,
      mediaAuthor: review.mediaAuthor,
      mediaYear: review.mediaYear,
      category: review.category,
      recommendation: review.recommendation,
      body: review.body
    }
  };
}
