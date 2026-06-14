'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
      <div className="text-center max-w-xl bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/20">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight">🔬 Doctor-Hub</h1>
        <p className="mb-8 text-lg font-medium text-blue-100">
          Welcome to your Complete Healthcare Management System. Book appointments, manage prescriptions, and handle medical records securely.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-blue-50 transition transform hover:-translate-y-0.5">
            Login to Account
          </Link>
          <Link href="/register" className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition transform hover:-translate-y-0.5 border border-blue-600">
            Register as New User
          </Link>
        </div>
      </div>
    </div>
  );
}