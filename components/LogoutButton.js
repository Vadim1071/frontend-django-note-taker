'use client';
import React from 'react';

const LogoutButton = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    setIsAuthenticated(false); // Сбрасываем аутентификацию
    alert('Logged out successfully!');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;