'use client';
import React, { useState, useEffect } from 'react';
import CreateNoteForm from '@/components/CreateNoteForm/CreateNoteForm';
import NoteList from '@/components/NoteList';
import FolderList from '@/components/FolderList/FolderList';
import TagList from '@/components/TagList/TagList'; // Импортируем TagList
import styles from './page.module.css';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Применяем тему при изменении состояния
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={styles.container}>
      {/* Переключатель темы */}
      <div className="toggleContainer">
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <label htmlFor="darkmode-toggle" className="toggle-switch">
          <span className="toggle-slider">
            <svg
              version="1.1"
              className="sun"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 496 496"
              style={{ enableBackground: 'new 0 0 496 496' }}
              xmlSpace="preserve"
            >
              {/* SVG для солнца */}
              <path d="M248,88c-88.224,0-160,71.776-160,160s71.776,160,160,160s160-71.776,160-160S336.224,88,248,88z M248,368c-66.168,0-120-53.832-120-120s53.832-120,120-120s120,53.832,120,120S314.168,368,248,368z" />
            </svg>
            <svg
              version="1.1"
              className="moon"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 49.739 49.739"
              style={{ enableBackground: 'new 0 0 49.739 49.739' }}
              xmlSpace="preserve"
            >
              {/* SVG для луны */}
              <path d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l0.615,2.268c2.089,7.662,9.43,12.941,17.389,12.941c5.523,0,10.749-2.35,14.315-6.484l1.531-1.593l1.06,1.878c5.253,9.292,3.149,21.302-4.928,28.397C42.305,46.532,33.799,48.889,25.068,48.889z" />
            </svg>
          </span>
        </label>
      </div>
      {/* Секция папок */}
      <div className={styles.sidebar}>
        <FolderList />
      </div>
      {/* Основная секция */}
      <div className={styles.main}>
        <CreateNoteForm />
        <NoteList />
      </div>
    </div>
  );
}