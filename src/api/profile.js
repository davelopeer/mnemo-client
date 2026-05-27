import { apiRequest } from './client.js';

const PROFILES_API_BASE = '/v1/profiles';

export function getMyProfile(token) {
  return apiRequest(`${PROFILES_API_BASE}/me`, { token });
}

export function updateMyProfile(token, payload) {
  return apiRequest(`${PROFILES_API_BASE}/me`, {
    method: 'PATCH',
    token,
    body: payload
  });
}

export function uploadMyAvatar(token, file) {
  const body = new FormData();
  body.append('avatar', file);

  return apiRequest(`${PROFILES_API_BASE}/me/avatar`, {
    method: 'POST',
    token,
    body
  });
}

export function removeMyAvatar(token) {
  return apiRequest(`${PROFILES_API_BASE}/me/avatar`, {
    method: 'DELETE',
    token
  });
}

export function getProfileByUsername(username) {
  return apiRequest(`${PROFILES_API_BASE}/${encodeURIComponent(username)}`);
}
