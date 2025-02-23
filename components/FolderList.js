'use client';
import React, { useState, useEffect } from 'react';
import { useNotes } from '@/context/NotesContext';

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
  } = useNotes();

  return (
    <div>
      <h2>Папки</h2>

      {/* Форма для добавления новой папки */}
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

      {/* Список папок */}
      {folders.map((folder) => (
        <div key={folder.id} style={{ margin: '0.5rem 0' }}>
          <div
            onClick={() => toggleFolder(folder.id)}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
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
            <span>{` (${folder.notes.length})`}</span>
          </div>

          <div style={{ marginLeft: '1rem' }}>
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

          {openFolderId === folder.id && (
            <div>
              {/* Форма для добавления заметки в папку */}
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

              {/* Список заметок в папке */}
              {folder.notes.map((noteId) => {
                const note = notes.find((n) => n.id === noteId);
                if (!note) return null;
                return (
                  <div key={note.id} className="note">
                    {editingNoteId === note.id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={{
                          width: '70%',
                          padding: '0.25rem',
                          borderRadius: '0.25rem',
                          border: '1px solid #d1d5db',
                        }}
                      />
                    ) : (
                      <span>{note.title}</span>
                    )}

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
                      onClick={() => deleteNote(note.id)}
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