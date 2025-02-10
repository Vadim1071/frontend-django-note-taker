'use client';
import React, { useState } from 'react';

const CreateTagForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title }); // Передаем новый тег в родительский компонент
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название тега"
        required
        style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
      />
      <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
        Создать
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.25rem' }}
      >
        Отмена
      </button>
    </form>
  );
};

export default CreateTagForm;