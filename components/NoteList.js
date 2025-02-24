'use client';
import React, { useContext } from 'react';
import { useNotes } from '@/context/NotesContext';
import styles from '@/app/page.module.css'; // Импорт стилей

const NoteList = () => {
  const { notes, deleteNote } = useNotes();

  return (
    <div className={styles.main}>
      <h2>Заметки</h2>
      {notes.map((note) => (
        <div key={note.id} className={styles.note}>
          <span>{note.title}</span>
          <button
            onClick={() => deleteNote(note.id)}
            className={styles.button}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;