import { apiRequest } from './client.js';

const FEED_API_BASE = '/v1/feed';

export function getFriendsFeed(token, { offset = 0, categories = [] } = {}) {
  const params = new URLSearchParams();
  params.set('offset', String(offset));
  categories.forEach((category) => params.append('category', category));

  return apiRequest(`${FEED_API_BASE}?${params.toString()}`, { token });
}
