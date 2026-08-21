import { apiRequest } from "./client.js";

const AUTH_API_BASE = "/v1/auth";

export function signup(payload, avatarFile) {
  const body = new FormData();
  body.append("firstName", payload.firstName);
  body.append("lastName", payload.lastName);
  body.append("email", payload.email);
  body.append("password", payload.password);
  body.append("age", String(payload.age));
  body.append("username", payload.username);
  if (payload.phone) {
    body.append("phone", payload.phone);
  }
  body.append("avatar", avatarFile);

  return apiRequest(`${AUTH_API_BASE}/signup`, {
    method: "POST",
    body,
  });
}

export function login(payload) {
  return apiRequest(`${AUTH_API_BASE}/login`, {
    method: "POST",
    body: payload,
  });
}

export function logout(token) {
  return apiRequest(`${AUTH_API_BASE}/logout`, {
    method: "POST",
    token,
  });
}

export function getMe(token) {
  return apiRequest(`${AUTH_API_BASE}/me`, {
    token,
  });
}
