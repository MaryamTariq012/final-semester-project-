'use client';
import { useState } from 'react';
import API from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'Patient',
    specialization: '', treatmentType: '', fees: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      setMessage(res.data.message);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Create Doctor-Hub Account</h2>
        {message && <p className="mb-4 text-center text-sm font-semibold text-green-600 bg-green-50 p-2 rounded">{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <label className="block text-sm font-medium text-gray-700">Select Your Role:</label>
          <select className="w-full rounded border p-2 text-black" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Assistant">Assistant</option>
          </select>

          {formData.role === 'Doctor' && (
            <div className="space-y-4 border-t pt-4">
              <input type="text" placeholder="Specialization (e.g. Skin, Heart)" className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
              <select className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, treatmentType: e.target.value})}>
                <option value="">Select Treatment Type</option>
                <option value="Allopathic">Allopathic</option>
                <option value="Homeopathic">Homeopathic</option>
                <option value="Herbal">Herbal</option>
              </select>
              <input type="number" placeholder="Consultation Fees (PKR)" className="w-full rounded border p-2 text-black" onChange={(e) => setFormData({...formData, fees: e.target.value})} />
            </div>
          )}

          <button type="submit" className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700">Register</button>
        </form>
      </div>
    </div>
  );
}