export function getAuthority() {
  return localStorage.getItem('_auth') || 'NULL';
}

export function setAuthority(authority: any) {
  return localStorage.setItem('_auth', authority);
}
