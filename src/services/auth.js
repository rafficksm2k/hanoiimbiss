export function credentialsMatch(username, password) {
  const expectedUser = import.meta.env.VITE_ADMIN_USERNAME ?? "";
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  return username === expectedUser && password === expectedPass;
}
