'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoteList from '@/components/NoteList';
import CreateNoteForm from '@/components/CreateNoteForm/CreateNoteForm';
import FolderList from '@/components/FolderList';
import LogoutButton from '@/components/LogoutButton';
import { isAuthenticated } from '@/logic/api/api';
import styles from './page.module.css';

export default function Home() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = isAuthenticated();
    setIsUserAuthenticated(auth);
    if (!auth) {
      router.push('/login'); // Перенаправление на страницу входа
    }
  }, [router]);

  if (!isUserAuthenticated) {
    return null; // Или загрузочный спиннер
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <LogoutButton />
          <FolderList />
        </div>
        <div className={styles.main}>
          <CreateNoteForm />
          <NoteList />
        </div>
      </div>
    </div>
  );
}