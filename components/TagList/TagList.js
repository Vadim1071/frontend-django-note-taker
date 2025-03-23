'use client';
import React from 'react';
import { useNotes } from '@/context/NotesContext'; // Импортируем useNotes
import styles from './TagList.module.css'; // Импортируем стили

const TagList = () => {
  const { tags, deleteTag } = useNotes(); // Получаем теги и функцию удаления из контекста

  return (
    <div className={styles.tagSection}>
      <h2>Теги</h2>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id} className={styles.tag}>
            <span>{tag.title}</span>
            <button onClick={() => deleteTag(tag.id)} className={styles.deleteButton}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;