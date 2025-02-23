'use client';
import './globals.css'; // Импорт глобальных стилей
import { NotesProvider } from '@/context/NotesContext'; // Импорт NotesProvider

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