import React, { useState } from 'react'; // Импортируем useState

const TagSelector = ({ tags = [], onTagAdd, onNewTagCreate }) => {
  const [newTag, setNewTag] = useState(''); // Используем useState

  const handleAddTag = (tag) => {
    onTagAdd(tag);
  };

  const handleCreateTag = () => {
    if (newTag.trim()) {
      onNewTagCreate({ title: newTag });
      setNewTag('');
    }
  };

  return (
    <div>
      <select onChange={(e) => handleAddTag(tags.find(tag => tag.id === parseInt(e.target.value)))}>
        <option value="">Выберите тег</option>
        {Array.isArray(tags) && tags.map(tag => (
          <option key={tag.id} value={tag.id}>{tag.title}</option>
        ))}
      </select>
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="Новый тег"
      />
      <button type="button" onClick={handleCreateTag}>
        +
      </button>
    </div>
  );
};

export default TagSelector;