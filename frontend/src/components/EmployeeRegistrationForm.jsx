import React, { useState } from 'react';
import API from '../api';

function EmployeeRegistrationForm({ onAdded }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    department: 'Development', 
    skills: 'React, Node.js', 
    performanceScore: 80, 
    experience: 1 
  });

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/employees', { 
        ...form, 
        skills: form.skills.split(',').map(s => s.trim()), 
        performanceScore: Number(form.performanceScore), 
        experience: Number(form.experience) 
      });
      setForm({ 
        name: '', 
        email: '', 
        department: 'Development', 
        skills: '', 
        performanceScore: 80, 
        experience: 1 
      });
      onAdded();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <form className="card grid" onSubmit={submit}>
      <h2>Employee Registration Form</h2>
      {['name','email','department','skills','performanceScore','experience'].map(k => (
        <input 
          key={k} 
          placeholder={k.charAt(0).toUpperCase() + k.slice(1)} 
          value={form[k]} 
          onChange={e => setForm({...form, [k]: e.target.value})} 
          required 
          type={k === 'performanceScore' || k === 'experience' ? 'number' : 'text'}
        />
      ))}
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeRegistrationForm;
