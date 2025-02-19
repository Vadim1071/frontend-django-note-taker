'use client';
import React, { useState } from 'react';
import TagSelector from '../TagSelector'; // Компонент для выбора тегов
import { createNote } from '../../logic/api/api';
import styles from './CreateNoteForm.module.css'; // Импортируем стили

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([
    { id: 1, title: 'Работа' },
    { id: 2, title: 'Личное' },
    { id: 3, title: 'Срочно' },
  ]);
  const [error, setError] = useState(''); // Состояние для ошибки

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content, tags: selectedTags };

    try {
      await createNote(newNote);
      alert('Заметка создана!');
      setTitle('');
      setContent('');
      setSelectedTags([]);
    } catch (err) {
      setError('Не удалось создать заметку. Пожалуйста, попробуйте снова.');
      console.error('Ошибка при создании заметки:', err);
    }
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Создать заметку</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Отображаем ошибку */}
      <div>
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label>Содержание:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textarea}
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
      <button type="submit" className={styles.button}>
        Сохранить
      </button>
    </form>
  );
};

export default CreateNoteForm;