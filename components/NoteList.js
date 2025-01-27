'use client';
import React, { useEffect, useState } from 'react';
import { getNotes } from '../logic/api/api';
import Link from 'next/link';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data.results || data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
        <Link
          href="/notes/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create New Note
        </Link>
      </div>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-700">{note.title}</h3>
            <p className="mt-2 text-gray-600">{note.content}</p>
            <p className="mt-2 text-sm text-gray-500">
              Created at: {new Date(note.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;