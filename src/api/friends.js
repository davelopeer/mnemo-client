import { apiRequest } from './client.js';

const FRIENDS_API_BASE = '/v1/friends';

export function listFriends(token) {
  return apiRequest(`${FRIENDS_API_BASE}`, { token });
}

export function listPendingRequests(token) {
  return apiRequest(`${FRIENDS_API_BASE}/requests/received`, { token });
}

export function searchUsers(token, query) {
  const params = new URLSearchParams({ q: query });
  return apiRequest(`${FRIENDS_API_BASE}/search?${params.toString()}`, { token });
}

export function sendFriendRequest(token, username) {
  return apiRequest(`${FRIENDS_API_BASE}/requests`, {
    method: 'POST',
    token,
    body: { username }
  });
}

export function acceptFriendRequest(token, requestId) {
  return apiRequest(`${FRIENDS_API_BASE}/requests/${requestId}/accept`, {
    method: 'POST',
    token
  });
}
