import { getToken } from '../lib/auth'

export async function api(path, opts = {}){
  const headers = opts.headers || {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  headers['Accept'] = 'application/json'
  if (!(opts.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
  }
  const res = await fetch(`/api${path}`, {...opts, headers })
  if (res.status === 401) {
    throw new Error('Unauthorized')
  }
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}