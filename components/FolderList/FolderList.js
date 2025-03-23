'use client';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // Импортируем ReactMarkdown
import { useNotes } from '@/context/NotesContext';
import styles from './FolderList.module.css';

const FolderList = () => {
  const { folders, addFolder, deleteFolder, notes } = useNotes();
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName);
      setNewFolderName('');
    }
  };

  useEffect(() => {
    console.log('Folders updated:', folders);
  }, [folders]);

  useEffect(() => {
    console.log('Notes updated:', notes);
  }, [notes]);

  return (
    <div className={styles.folderSection}>
      <h2>Папки</h2>
      <div className={styles.addFolder}>
        <input
          type="text"
          placeholder="Название папки"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddFolder} className={styles.addButton}>
          +
        </button>
      </div>
      {folders.map((folder) => (
        <div key={folder.id} className={styles.folder}>
          <div className={styles.folderHeader}>
            <h3>{folder.name}</h3>
            <button onClick={() => deleteFolder(folder.id)} className={styles.deleteButton}>
              🗑️
            </button>
          </div>
          <div className={styles.notesInFolder}>
            {notes
              .filter((note) => note.folderId === folder.id)
              .map((note) => (
                <div key={note.id} className={styles.note}>
                  <h4>{note.title}</h4>
                  <ReactMarkdown>{note.content}</ReactMarkdown> {/* Используем ReactMarkdown */}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FolderList;