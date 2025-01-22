'use client';
import React, { useState } from 'react';
import { createTag } from '../logic/api/api';

const CreateTagForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTag = { title };
    await createTag(newTag);
    setTitle('');
    alert('Tag created successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Tag</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTagForm;