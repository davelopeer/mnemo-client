import { apiRequest } from "./client.js";

const REVIEWS_API_BASE = "/v1/reviews";
const PROFILES_API_BASE = "/v1/profiles";

export function createReview(token, payload) {
  const body = new FormData();
  body.append("mediaTitle", payload.mediaTitle);
  body.append("mediaAuthor", payload.mediaAuthor ?? "");
  body.append("mediaYear", payload.mediaYear ? String(payload.mediaYear) : "");
  body.append("category", payload.category);
  body.append("rating", String(payload.rating));
  body.append("isPrivate", String(payload.isPrivate ?? false));

  if (payload.mediaSubtitle) {
    body.append("mediaSubtitle", payload.mediaSubtitle);
  }

  return apiRequest(REVIEWS_API_BASE, {
    method: "POST",
    token,
    body,
  });
}

export function updateReview(token, id, payload) {
  const body = new FormData();
  body.append("mediaTitle", payload.mediaTitle);
  body.append("mediaAuthor", payload.mediaAuthor ?? "");
  body.append("mediaYear", payload.mediaYear ? String(payload.mediaYear) : "");
  body.append("category", payload.category);
  body.append("rating", String(payload.rating));
  body.append("isPrivate", String(payload.isPrivate ?? false));

  if (payload.mediaSubtitle) {
    body.append("mediaSubtitle", payload.mediaSubtitle);
  }

  return apiRequest(`${REVIEWS_API_BASE}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body,
  });
}

export function deleteReview(token, id) {
  return apiRequest(`${REVIEWS_API_BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
}

export function getMyProfileReviews(token) {
  return apiRequest(`${PROFILES_API_BASE}/me/reviews`, { token });
}

export function getProfileReviews(username) {
  return apiRequest(
    `${PROFILES_API_BASE}/${encodeURIComponent(username)}/reviews`,
  );
}
