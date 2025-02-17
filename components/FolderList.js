'use client';
import React, { useState, useEffect } from 'react';

const FolderList = () => {
  const [folders, setFolders] = useState(() => {
    const savedFolders = localStorage.getItem('folders');
    return savedFolders ? JSON.parse(savedFolders) : [];
  });

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const [openFolderId, setOpenFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const toggleFolder = (folderId) => {
    setOpenFolderId(openFolderId === folderId ? null : folderId);
  };

  const addFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        notes: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const addNoteToFolder = (folderId) => {
    if (newNoteTitle.trim()) {
      const updatedFolders = folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, notes: [...folder.notes, { id: Date.now(), title: newNoteTitle }] }
          : folder
      );
      setFolders(updatedFolders);
      setNewNoteTitle('');
    }
  };

  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(updatedFolders);
  };

  const deleteNote = (folderId, noteId) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === folderId
        ? { ...folder, notes: folder.notes.filter((note) => note.id !== noteId) }
        : folder
    );
    setFolders(updatedFolders);
  };

  const startEditingFolder = (folderId, currentName) => {
    setEditingFolderId(folderId);
    setEditedName(currentName);
  };

  const startEditingNote = (noteId, currentTitle) => {
    setEditingNoteId(noteId);
    setEditedName(currentTitle);
  };

  const saveEditing = (folderId, noteId = null) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        if (noteId) {
          return {
            ...folder,
            notes: folder.notes.map((note) =>
              note.id === noteId ? { ...note, title: editedName } : note
            ),
          };
        } else {
          return { ...folder, name: editedName };
        }
      }
      return folder;
    });
    setFolders(updatedFolders);
    setEditingFolderId(null);
    setEditingNoteId(null);
    setEditedName('');
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Папки</h3>

      {/* Форма для добавления новой папки */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Название папки"
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #d1d5db',
            fontSize: '0.875rem',
          }}
        />
        <button
          onClick={addFolder}
          style={{
            width: '100%',
            padding: '0.5rem',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          Добавить папку
        </button>
      </div>

      {/* Список папок */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          style={{
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.25rem',
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <div
              onClick={() => toggleFolder(folder.id)}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {editingFolderId === folder.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #d1d5db',
                  }}
                />
              ) : (
                <span>{folder.name}</span>
              )}
              {' (' + folder.notes.length + ')'}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              {editingFolderId === folder.id ? (
                <button
                  onClick={() => saveEditing(folder.id)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  Сохранить
                </button>
              ) : (
                <button
                  onClick={() => startEditingFolder(folder.id, folder.name)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: '#facc15',
                    color: '#000',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={() => deleteFolder(folder.id)}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
              >
                Удалить
              </button>
            </div>
          </div>

          {openFolderId === folder.id && (
            <div style={{ marginLeft: '1rem' }}>
              {/* Форма для добавления заметки в папку */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Название заметки"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                  }}
                />
                <button
                  onClick={() => addNoteToFolder(folder.id)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  Добавить заметку
                </button>
              </div>

              {/* Список заметок в папке */}
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {folder.notes.map((note) => (
                  <li
                    key={note.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      padding: '0.25rem',
                      borderRadius: '0.25rem',
                      backgroundColor: '#f9fafb',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {editingNoteId === note.id ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.25rem',
                            borderRadius: '0.25rem',
                            border: '1px solid #d1d5db',
                          }}
                        />
                      ) : (
                        <span>{note.title}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      {editingNoteId === note.id ? (
                        <button
                          onClick={() => saveEditing(folder.id, note.id)}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: '#22c55e',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          Сохранить
                        </button>
                      ) : (
                        <button
                          onClick={() => startEditingNote(note.id, note.title)}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: '#facc15',
                            color: '#000',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          Редактировать
                        </button>
                      )}
                      <button
                        onClick={() => deleteNote(folder.id, note.id)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderList;