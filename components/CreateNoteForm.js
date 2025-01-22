'use client';
import React, { useState } from 'react';
import { createNote } from '../logic/api/api'; // Исправленный импорт

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    await createNote(newNote);
    setTitle('');
    setContent('');
    alert('Note created successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNoteForm;