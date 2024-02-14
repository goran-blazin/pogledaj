// in src/MyLoginPage.js
import React from 'react';
import {useState} from 'react';
import {useLogin, useNotify} from 'react-admin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({email, password}).catch(() => notify('Invalid email or password'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </form>
  );
};

export default Login;
