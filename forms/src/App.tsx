import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto p-3 flex items-center justify-between gap-4">
          <h1 className="text-lg font-semibold">forms</h1>

          <div className="flex items-center gap-2">
            <span className="sr-only">Viewport</span>
            <button aria-pressed="true" className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Desktop</button>
            <button className="px-3 py-1 rounded-md bg-white text-sm border border-gray-200">Tablet</button>
            <button className="px-3 py-1 rounded-md bg-white text-sm border border-gray-200">Mobile</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
