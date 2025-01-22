'use client';
import { useEffect, useState } from 'react';
import { getNotes } from '../logic/api/api';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.results.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}