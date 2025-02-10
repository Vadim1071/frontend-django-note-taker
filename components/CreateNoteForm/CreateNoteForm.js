'use client';
import React, { useState } from 'react';
import TagSelector from '../TagSelector'; // Компонент для выбора тегов
import { createNote } from '../../logic/api/api';

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([
    { id: 1, title: 'Работа' },
    { id: 2, title: 'Личное' },
    { id: 3, title: 'Срочно' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content, tags: selectedTags };
    await createNote(newNote);
    alert('Заметка создана!');
    setTitle('');
    setContent('');
    setSelectedTags([]);
  };

  const handleTagAdd = (tag) => {
    setSelectedTags([...selectedTags, tag]); // Добавляем тег к выбранным
  };

  const handleNewTagCreate = (newTag) => {
    const tagWithId = { ...newTag, id: Date.now() }; // Генерируем ID для нового тега
    setTags([...tags, tagWithId]); // Добавляем новый тег в список
    setSelectedTags([...selectedTags, tagWithId]); // Добавляем новый тег к выбранным
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>Создать заметку</h2>
      <div>
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
        />
      </div>
      <div>
        <label>Содержание:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
        />
      </div>
      <div>
        <label>Теги:</label>
        <TagSelector
          tags={tags}
          onTagAdd={handleTagAdd}
          onNewTagCreate={handleNewTagCreate}
        />
      </div>
      <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
        Сохранить
      </button>
    </form>
  );
};

export default CreateNoteForm;