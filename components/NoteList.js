import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNotes } from '@/context/NotesContext';
import styles from './NoteList.module.css';

const NoteList = () => {
  const { notes, tags, deleteNote } = useNotes(); // Добавляем deleteNote

  return (
    <div className={styles.notesSection}>
      <h2>Заметки</h2>
      {notes.map((note) => {
        const noteTag = tags.find((tag) => tag.id === note.tagId);
        return (
          <div key={note.id} className={styles.note}>
            <h3>{note.title}</h3>
            {noteTag && <span className={styles.tag}>Тег: {noteTag.title}</span>}
            <ReactMarkdown>{note.content}</ReactMarkdown>
            {/* Кнопка удаления заметки */}
            <button
              onClick={() => deleteNote(note.id)}
              className={styles.deleteButton}
            >
              Удалить
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;