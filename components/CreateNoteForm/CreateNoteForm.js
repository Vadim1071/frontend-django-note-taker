'use client';
import React, { useState, useEffect } from 'react';
import TagSelector from '../TagSelector';
import { createNote, getTags, createTag } from '../../logic/api/api';
import styles from './CreateNoteForm.module.css';

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  // Загружаем теги с сервера
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        console.log('Ответ от getTags:', response);

        if (Array.isArray(response)) {
          setTags(response);
        } else {
          console.error('Ожидался массив тегов, но получено:', response);
          setTags([]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке тегов:', error);
        setTags([]);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagIds = selectedTags.map(tag => tag.id);
    const newNote = { title, content, tags: tagIds };

    console.log('Отправляемые данные:', newNote);

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
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  const handleNewTagCreate = async (newTag) => {
    try {
      const response = await createTag(newTag);
      const createdTag = response;

      setTags((prevTags) => [...prevTags, createdTag]);
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, createdTag]);
    } catch (error) {
      console.error('Ошибка при создании тега:', error);
      setError('Не удалось создать тег. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Создать заметку</h2>
      {error && <p className={styles.error}>{error}</p>}
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
        <div>
          <strong>Выбранные теги:</strong>
          {selectedTags.map(tag => (
            <span key={tag.id} className={styles.tag}>
              {tag.title}
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Сохранить
      </button>
    </form>
  );
};

export default CreateNoteForm;