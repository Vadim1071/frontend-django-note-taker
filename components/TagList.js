'use client';
import React, { useEffect, useState } from 'react';
import { getTags } from '../logic/api/api'; // Исправленный импорт

const TagList = () => {
  const [tags, setTags] = useState([]);
  console.log(tags)

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTags();
      setTags(data.results);
    };
    fetchTags();
  }, []);
console.log(tags)
  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;