import React, { useState } from 'react';
import API from '../api';

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const path = isLogin ? '/auth/login' : '/auth/signup';
      const { data } = await API.post(path, form);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (err) { 
      setMsg(err.response?.data?.message || 'Something went wrong'); 
    }
  };

  return (
    <div className="auth card">
      <h1>{isLogin ? 'HR Login' : 'HR Signup'}</h1>
      {!isLogin && <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>}
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>{isLogin ? 'Login' : 'Create Account'}</button>
      <p className="link" onClick={()=>setIsLogin(!isLogin)}>{isLogin ? 'Create new account' : 'Already have account?'}</p>
      <p className="error">{msg}</p>
    </div>
  );
}

export default Auth;
