'use client';

export function getAuth() {
  const data = localStorage.getItem('token');
  return JSON.parse(data ?? 'null');
}

export function setAuth(payload: object) {
  localStorage.setItem('token', JSON.stringify(payload));
}

export function deleteAuth() {
  localStorage.removeItem('token');
}
