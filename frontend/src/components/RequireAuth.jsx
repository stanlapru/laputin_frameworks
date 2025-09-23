import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, fetchCurrentUser } from '../lib/auth'

export default function RequireAuth({ children, roles }) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function check(){
      const token = getToken()
      if (!token){ setAllowed(false); setLoading(false); return }
      const user = await fetchCurrentUser()
      if (!user){ setAllowed(false); setLoading(false); return }
      if (roles && roles.length > 0){
        setAllowed(roles.includes(user.role))
      } else setAllowed(true)
      setLoading(false)
    }
    check()
  }, [roles])

  if (loading) return <div>Загрузка...</div>
  if (!allowed) return <Navigate to="/login" replace />
  return children
}
