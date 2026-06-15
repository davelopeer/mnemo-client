const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const isFormData = body instanceof FormData;
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error?.message ?? 'Nao foi possivel concluir a solicitacao';
    throw new Error(message);
  }

  return data;
}

export function resolveApiAssetUrl(path, cacheKey) {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const url = `${API_BASE_URL}${path}`;
  if (!cacheKey) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(cacheKey)}`;
}
