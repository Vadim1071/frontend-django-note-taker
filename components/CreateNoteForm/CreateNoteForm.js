'use client';
import React, { useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import styles from './CreateNoteForm.module.css';

const CreateNoteForm = () => {
  const { folders, tags, addNoteToFolder, addNote, addTag } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Заголовок и содержание заметки обязательны');
      return;
    }

    const newNote = { title, content, tagId: selectedTagId };

    if (selectedFolderId) {
      addNoteToFolder(selectedFolderId, newNote);
    } else {
      addNote(newNote);
    }

    setTitle('');
    setContent('');
    setSelectedFolderId(null);
    setSelectedTagId(null);
    setError('');
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({ title: newTagName });
      setNewTagName('');
    }
  };

  return (
    <div className={styles.form}>
      <h2>Создать заметку</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <textarea
        placeholder="Содержание (поддерживается Markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
      />

      {/* Выпадающий список для папок */}
      <div className={styles.selectContainer}>
        <select
          value={selectedFolderId || ''}
          onChange={(e) => setSelectedFolderId(e.target.value || null)}
          className={styles.select}
        >
          <option value="">Без папки</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {/* Выпадающий список для тегов */}
      <div className={styles.selectContainer}>
        <select
          value={selectedTagId || ''}
          onChange={(e) => setSelectedTagId(e.target.value || null)}
          className={styles.select}
        >
          <option value="">Без тега</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Новый тег"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          className={styles.tagInput}
        />
        <button onClick={handleAddTag} className={styles.addTagButton}>
          +
        </button>
      </div>

      <button onClick={handleSubmit} className={styles.button}>
        Сохранить
      </button>
    </div>
  );
};

export default CreateNoteForm;