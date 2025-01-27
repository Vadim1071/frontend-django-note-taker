'use client';
import React from 'react';
import NoteList from '../components/NoteList';
import CreateNoteForm from '../components/CreateNoteForm';
import TagList from '../components/TagList';
import CreateTagForm from '../components/CreateTagForm';
import FolderList from '../components/FolderList';
import LogoutButton from '../components/LogoutButton';
import { isAuthenticated } from '../logic/api/api';
import Login from '@/logic/login';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const isUserAuthenticated = isAuthenticated(); 
  
  return (
    <div>
      <h1>Welcome to My App</h1>
      {isUserAuthenticated && (
        // Если пользователь аутентифицирован, показываем компоненты
        <>
          <LogoutButton />
          <CreateNoteForm />
          <NoteList />
          <CreateTagForm />
          <TagList />
          <FolderList />
        </>
      )}
    </div>
  );
}
