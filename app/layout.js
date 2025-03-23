'use client';
import './globals.css';
import { NotesProvider } from '@/context/NotesContext';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <NotesProvider>
          {children}
        </NotesProvider>
      </body>
    </html>
  );
}