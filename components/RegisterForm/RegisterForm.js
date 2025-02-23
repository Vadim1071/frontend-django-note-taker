'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { register, setAuthToken } from '@/logic/api/api';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const username = formRef.current.elements.username.value.trim();
    const password = formRef.current.elements.password.value.trim();
    const email = formRef.current.elements.email.value.trim();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await register(username, password, email);

      if (response.access_token) {
        setAuthToken(response.access_token); // Сохраняем токен
        router.push('/'); // Перенаправляем на главную страницу
      } else {
        throw new Error('Registration failed: Access token not received');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input type="text" name="username" required className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input type="password" name="password" required className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email (optional):</label>
          <input type="email" name="email" className={styles.inputField} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;