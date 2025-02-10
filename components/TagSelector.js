'use client';
import React, { useState } from 'react';
import CreateTagForm from './CreateTagForm/CreateTagForm'; // Компонент для создания нового тега

const TagSelector = ({ tags, onTagAdd, onNewTagCreate }) => {
  const [showCreateTagForm, setShowCreateTagForm] = useState(false);

  const handleAddTag = (tag) => {
    onTagAdd(tag); // Добавляем тег к заметке
  };

  const handleCreateNewTag = (newTag) => {
    onNewTagCreate(newTag); // Создаем новый тег
    setShowCreateTagForm(false); // Закрываем форму
  };

  return (
    <div>
      <div>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleAddTag(tag)}
            style={{ margin: '0.25rem', padding: '0.25rem 0.5rem', background: '#e2e8f0', border: 'none', borderRadius: '0.25rem' }}
          >
            {tag.title}
          </button>
        ))}
        <button
          onClick={() => setShowCreateTagForm(true)}
          style={{ margin: '0.25rem', padding: '0.25rem 0.5rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.25rem' }}
        >
          +
        </button>
      </div>

      {showCreateTagForm && (
        <CreateTagForm
          onSubmit={handleCreateNewTag}
          onCancel={() => setShowCreateTagForm(false)}
        />
      )}
    </div>
  );
};

export default TagSelector;