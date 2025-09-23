import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

export default function DefectCreate(){
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState(2)
  const [files, setFiles] = useState(null)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    const fd = new FormData()
    fd.append('title', title)
    fd.append('description', desc)
    fd.append('priority', priority)
    if (files) {
      for (let i=0;i<files.length;i++) fd.append('attachments', files[i])
    }
    const res = await fetch('/api/defects', { method:'POST', body: fd })
    if (!res.ok) {
      const err = await res.json()
      alert(err.detail || 'Ошибка')
      return
    }
    navigate('/defects')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Заголовок</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required className="w-full" />
      </div>
      <div>
        <label>Описание</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full"/>
      </div>
      <div>
        <label>Приоритет</label>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value={1}>Высокий</option>
          <option value={2}>Средний</option>
          <option value={3}>Низкий</option>
        </select>
      </div>
      <div>
        <label>Вложения (фото/документы)</label>
        <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
      </div>
      <button className="btn">Создать</button>
    </form>
  )
}
