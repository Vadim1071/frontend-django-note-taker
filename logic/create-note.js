import { useState } from 'react';
import { useRouter } from 'next/router';
import { createNote } from './api/api';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); // Состояние для ошибки
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote({ title, content });
      router.push('/notes');
    } catch (err) {
      setError('Не удалось создать заметку. Пожалуйста, попробуйте снова.');
      console.error('Ошибка при создании заметки:', err);
    }
  };

  return (
    <>
      <h1>Create Note</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}