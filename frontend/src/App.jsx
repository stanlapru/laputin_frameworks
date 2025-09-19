import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getToken, clearToken } from './lib/auth' 

export default function App(){
  const navigate = useNavigate()
  const logged = !!getToken()

  function logout(){
    clearToken()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">Система Контроля Брака</h1>
          <nav className="space-x-3">
            <Link to="/defects" className="text-sky-600 hover:underline">Браки</Link>
            <Link to="/defects/create" className="text-sky-600 hover:underline">Новый брак</Link>
          </nav>
        </div>
        <div>
          {logged ? (
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={logout}>Выйти</button>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-sky-500 text-white rounded">Войти</Link>
          )}
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <Outlet/>
      </main>
    </div>
  )
}
