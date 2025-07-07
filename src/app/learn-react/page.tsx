'use client';

import { useState } from 'react';

export default function LearnReactPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(name);
    setName('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🚀 React with Next.js Sikho</h1>

      {/* 🔢 Counter */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Counter: {count}</h2>
        <div className="space-x-2">
          <button onClick={() => setCount(count + 1)} className="bg-green-500 text-white px-4 py-1 rounded">+1</button>
          <button onClick={() => setCount(count - 1)} className="bg-yellow-500 text-white px-4 py-1 rounded">-1</button>
          <button onClick={() => setCount(0)} className="bg-red-500 text-white px-4 py-1 rounded">Reset</button>
        </div>
      </div>

      {/* 📝 Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Apna naam likho"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {submittedName && (
        <p className="mt-4 text-green-700 font-semibold">
          👋 Namaste, {submittedName}!
        </p>
      )}
    </div>
  );
}
