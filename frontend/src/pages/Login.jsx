import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../api/client';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to their intended destination or default to /admin
  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A12] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1825] rounded-2xl p-8 border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7B4FD0] to-[#9B72EF] rounded-xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(155,114,239,0.3)]">
            <FiLock className="text-white text-xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-gray-400">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiMail />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-[#0C0A12] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#9B72EF] focus:border-transparent transition-all outline-none"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiLock />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-[#0C0A12] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#9B72EF] focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-gradient-to-r from-[#7B4FD0] to-[#9B72EF] hover:opacity-90 text-white font-medium rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(155,114,239,0.39)] hover:shadow-[0_6px_20px_rgba(155,114,239,0.23)]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiLogIn /> Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
