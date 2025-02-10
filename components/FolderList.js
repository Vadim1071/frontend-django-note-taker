'use client';
import React, { useState } from 'react';

const FolderList = () => {
  // Пример данных: папки и заметки
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'Работа',
      notes: [
        { id: 1, title: 'Заметка 1' },
        { id: 2, title: 'Заметка 2' },
      ],
    },
    {
      id: 2,
      name: 'Личное',
      notes: [
        { id: 3, title: 'Заметка 3' },
      ],
    },
  ]);

  // Состояние для открытия/закрытия папок
  const [openFolderId, setOpenFolderId] = useState(null);

  // Обработчик открытия/закрытия папки
  const toggleFolder = (folderId) => {
    setOpenFolderId(openFolderId === folderId ? null : folderId);
  };

  return (
    <div>
      <h3>Папки</h3>
      {folders.map((folder) => (
        <div key={folder.id} style={{ marginBottom: '1rem' }}>
          <div
            onClick={() => toggleFolder(folder.id)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {folder.name} ({folder.notes.length})
          </div>
          {openFolderId === folder.id && (
            <ul style={{ marginLeft: '1rem', listStyleType: 'none' }}>
              {folder.notes.map((note) => (
                <li key={note.id}>{note.title}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderList;