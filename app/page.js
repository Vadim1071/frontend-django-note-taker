'use client';
import React from 'react';
import NoteList from '@/components/NoteList';
import CreateNoteForm from '@/components/CreateNoteForm/CreateNoteForm';
import TagList from '@/components/TagList';
import CreateTagForm from '@/components/CreateTagForm/CreateTagForm';
import FolderList from '@/components/FolderList';
import LogoutButton from '@/components/LogoutButton';
import { isAuthenticated } from '@/logic/api/api';
import styles from './page.module.css';

export default function Home() {
  const isUserAuthenticated = isAuthenticated();

  return (
    <div className={styles.container}>
      {isUserAuthenticated && (
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <LogoutButton />
            <FolderList /> {/* Добавляем компонент с папками */}
          </div>
          <div className={styles.main}>
            <CreateNoteForm /> {/* Новая форма создания заметки */}
            <NoteList />
          </div>
        </div>
      )}
    </div>
  );
}