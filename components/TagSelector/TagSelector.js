'use client';
import React, { useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import styles from './TagSelector.module.css';

const TagSelector = () => {
  const { tags, addTag } = useNotes();
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({ title: newTagName });
      setNewTagName('');
    }
  };

  return (
    <div className={styles.tagSelector}>
      <h2>Теги</h2>
      <div className={styles.addTag}>
        <input
          type="text"
          placeholder="Новый тег"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddTag} className={styles.addButton}>
          +
        </button>
      </div>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id} className={styles.tag}>
            {tag.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSelector;