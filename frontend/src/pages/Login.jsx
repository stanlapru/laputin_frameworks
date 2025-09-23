import React, { useState } from 'react'
import { setToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function submit(e){
  e.preventDefault()
  setError(null)
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    if (!res.ok){
      const err = await res.json()
      setError(err.detail || 'Ошибка авторизации')
      return
    }
    const data = await res.json()
    setToken(data.access_token)
    navigate('/defects')
  } catch (err) {
    setError('Серверная ошибка')
  }
}

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 >СистемаКонтроля</h1>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">Авторизация</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Почта</label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">Пароль</label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400">
              Авторизоваться
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Нет аккаунта?
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300"> Зарегистрируйтесь</a>
        </p>
      </div>
    </div>
  )
}
