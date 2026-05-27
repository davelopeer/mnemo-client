import { apiRequest } from './client.js';

const AUTH_API_BASE = '/v1/auth';

export function signup(payload) {
  return apiRequest(`${AUTH_API_BASE}/signup`, {
    method: 'POST',
    body: payload
  });
}

export function login(payload) {
  return apiRequest(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    body: payload
  });
}

export function logout(token) {
  return apiRequest(`${AUTH_API_BASE}/logout`, {
    method: 'POST',
    token
  });
}

export function getMe(token) {
  return apiRequest(`${AUTH_API_BASE}/me`, {
    token
  });
}
