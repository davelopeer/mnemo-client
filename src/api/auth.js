import { apiRequest } from './client.js';

export function signup(payload) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: payload
  });
}

export function login(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: payload
  });
}

export function logout(token) {
  return apiRequest('/auth/logout', {
    method: 'POST',
    token
  });
}

export function getMe(token) {
  return apiRequest('/auth/me', {
    token
  });
}
