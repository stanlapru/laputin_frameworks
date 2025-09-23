const TOKEN_KEY = 'defects_token'
export function setToken(token){ localStorage.setItem(TOKEN_KEY, token) }
export function getToken(){ return localStorage.getItem(TOKEN_KEY) }
export function clearToken(){ localStorage.removeItem(TOKEN_KEY) }

export async function fetchCurrentUser(){
  const token = getToken()
  if (!token) return null
  const res = await fetch('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) return null
  return await res.json()  // { id, email, role, full_name }
}