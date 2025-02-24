'use client';
import React, { useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import styles from '@/app/page.module.css'; // Импорт стилей

const FolderList = () => {
  const {
    folders,
    setFolders,
    openFolderId,
    setOpenFolderId,
    newFolderName,
    setNewFolderName,
    newNoteTitle,
    setNewNoteTitle,
    editingFolderId,
    setEditingFolderId,
    editingNoteId,
    setEditingNoteId,
    editedName,
    setEditedName,
    toggleFolder,
    addFolder,
    addNoteToFolder,
    deleteFolder,
    deleteNote,
    startEditingFolder,
    startEditingNote,
    saveEditing,
    notes,
  } = useNotes();

  // Состояние для содержимого заметки
  const [newNoteContent, setNewNoteContent] = useState('');

  // Состояние для раскрытой заметки
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  // Обработчик добавления заметки в папку
  const handleAddNoteToFolder = (folderId) => {
    if (!newNoteTitle.trim()) {
      alert('Название заметки не может быть пустым');
      return;
    }

    const newNote = {
      title: newNoteTitle,
      content: newNoteContent, // Добавляем содержимое заметки
      folderId: folderId,
    };

    addNoteToFolder(folderId, newNote); // Передаем новую заметку в функцию
    setNewNoteTitle(''); // Очищаем поле названия
    setNewNoteContent(''); // Очищаем поле содержимого
  };

  // Обработчик раскрытия/скрытия содержимого заметки
  const toggleNoteContent = (noteId) => {
    setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.folderListTitle}>Папки</h2>

      {/* Форма для добавления новой папки */}
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="Название папки"
        className={styles.input}
      />
      <button
        onClick={addFolder}
        className={`${styles.button} ${styles.add}`}
      >
        Добавить папку
      </button>

      {/* Список папок */}
      {folders.map((folder) => (
        <div key={folder.id} className={styles.folder}>
          <div
            onClick={() => toggleFolder(folder.id)}
            className={styles.folderHeader}
          >
            {editingFolderId === folder.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className={styles.input}
              />
            ) : (
              <span>{folder.name}</span>
            )}
            <span>{` (${folder.notes.length})`}</span>
          </div>

          <div className={styles.folderActions}>
            {editingFolderId === folder.id ? (
              <button
                onClick={() => saveEditing(folder.id)}
                className={`${styles.button} ${styles.save}`}
              >
                Сохранить
              </button>
            ) : (
              <button
                onClick={() => startEditingFolder(folder.id, folder.name)}
                className={`${styles.button} ${styles.edit}`}
              >
                Редактировать
              </button>
            )}
            <button
              onClick={() => deleteFolder(folder.id)}
              className={styles.button}
            >
              Удалить
            </button>
          </div>

          {openFolderId === folder.id && (
            <div>
              {/* Форма для добавления заметки в папку */}
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Название заметки"
                className={styles.input}
              />
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Содержание заметки"
                className={styles.textarea}
              />
              <button
                onClick={() => handleAddNoteToFolder(folder.id)}
                className={styles.button}
              >
                Добавить заметку
              </button>

              {/* Список заметок в папке */}
              {folder.notes.map((noteId) => {
                const note = notes.find((n) => n.id === noteId);
                if (!note) return null;
                return (
                  <div key={note.id} className={styles.note}>
                    <div
                      onClick={() => toggleNoteContent(note.id)}
                      className={styles.noteHeader}
                    >
                      {editingNoteId === note.id ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className={styles.input}
                        />
                      ) : (
                        <span>{note.title}</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Предотвращаем всплытие события
                          toggleNoteContent(note.id);
                        }}
                        className={styles.toggleButton}
                      >
                        {expandedNoteId === note.id ? 'Скрыть' : 'Показать'}
                      </button>
                    </div>

                    {/* Отображение содержимого заметки, если она раскрыта */}
                    {expandedNoteId === note.id && (
                      <div className={styles.noteContent}>
                        <p>{note.content}</p>
                      </div>
                    )}

                    <div className={styles.noteActions}>
                      {editingNoteId === note.id ? (
                        <button
                          onClick={() => saveEditing(folder.id, note.id)}
                          className={`${styles.button} ${styles.save}`}
                        >
                          Сохранить
                        </button>
                      ) : (
                        <button
                          onClick={() => startEditingNote(note.id, note.title)}
                          className={`${styles.button} ${styles.edit}`}
                        >
                          Редактировать
                        </button>
                      )}
                      <button
                        onClick={() => deleteNote(note.id)}
                        className={styles.button}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderList;