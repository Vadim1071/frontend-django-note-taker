'use client';
import React, { useState, useRef } from 'react';
import { redirect } from 'next';
import { login, register, setAuthToken } from '../logic/api/api';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      const response = await register(
        formRef.current.elements.username.value,
        formRef.current.elements.password.value,
        formRef.current.elements.email.value || ''
      );

      if (response.status === 201) {
        const response = await login(
          formRef.current.elements.username.value,
          formRef.current.elements.password.value
        );

        setAuthToken(response.access);
        redirect('/');
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Устанавливаем сообщение об ошибке
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input type="text" name="username" required />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>

      <div>
        <label>Email (optional):</label>
        <input type="email" name="email" />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;