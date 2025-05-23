// app/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      {/* Demo Credentials Box */}
      <div className="absolute top-4 right-4 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm max-w-xs">
        <p className="text-sm text-blue-800">
          <strong>Demo Credentials:</strong><br />
          Email: <span className="font-medium">demo@gmail.com</span><br />
          Password: <span className="font-medium">password123</span>
        </p><br />
        <p className="text-sm text-blue-800">
          <strong>Another Account:</strong><br />
          Email: <span className="font-medium">roshnag.jio@gmail.com</span><br />
          Password: <span className="font-medium">password123</span>
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login to Periscope</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-3">
            <FaEnvelope className="text-gray-600" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent flex-1 focus:outline-none text-gray-800"
              required
            />
          </div>
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-3">
            <FaLock className="text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent flex-1 focus:outline-none text-gray-800"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white rounded-lg py-3 font-semibold hover:bg-green-800 transition disabled:bg-green-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
