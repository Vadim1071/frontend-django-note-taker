'use client';
import React, { useEffect, useState } from 'react';
import { getFolders } from '../logic/api/api'; // Исправленный импорт

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const data = await getFolders();
      setFolders(data);
    };
    fetchFolders();
  }, []);

  return (
    <div>
      <h2>Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{folder.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;