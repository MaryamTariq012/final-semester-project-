'use client';
import { useState } from 'react';
import API from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name);

      if (res.data.user.role === 'Patient') router.push('/dashboard/patient');
      else if (res.data.user.role === 'Doctor') router.push('/dashboard/doctor');
      else if (res.data.user.role === 'Assistant') router.push('/dashboard/assistant');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Login to Doctor-Hub</h2>
        {error && <p className="mb-4 text-center text-sm font-semibold text-red-600 bg-red-50 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email Address" required className="w-full rounded border p-2 text-black" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full rounded border p-2 text-black" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
}