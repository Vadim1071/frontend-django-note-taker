import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const savedFolders = localStorage.getItem('folders');
    return savedFolders ? JSON.parse(savedFolders) : [];
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const [openFolderId, setOpenFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const toggleFolder = (folderId) => {
    setOpenFolderId(openFolderId === folderId ? null : folderId);
  };

  const addFolder = () => {
    const trimmedName = newFolderName.trim();
    if (trimmedName) {
      const newFolder = {
        id: Date.now(),
        name: trimmedName,
        notes: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const addNoteToFolder = (folderId) => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        folderId: folderId,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
    }
  };

  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    const updatedNotes = notes.filter((note) => note.folderId !== folderId);
    setFolders(updatedFolders);
    setNotes(updatedNotes);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const startEditingFolder = (folderId, currentName) => {
    setEditingFolderId(folderId);
    setEditedName(currentName);
  };

  const startEditingNote = (noteId, currentTitle) => {
    setEditingNoteId(noteId);
    setEditedName(currentTitle);
  };

  const saveEditing = (folderId, noteId = null) => {
    if (noteId) {
      const updatedNotes = notes.map((note) =>
        note.id === noteId ? { ...note, title: editedName } : note
      );
      setNotes(updatedNotes);
    } else {
      const updatedFolders = folders.map((folder) =>
        folder.id === folderId ? { ...folder, name: editedName } : folder
      );
      setFolders(updatedFolders);
    }
    setEditingFolderId(null);
    setEditingNoteId(null);
    setEditedName('');
  };

  return (
    <NotesContext.Provider
      value={{
        folders,
        setFolders,
        openFolderId,
        setOpenFolderId,
        newFolderName,
        setNewFolderName,
        newNoteTitle,
        setNewNoteTitle,
        editingFolderId,
        setEditingFolderId,
        editingNoteId,
        setEditingNoteId,
        editedName,
        setEditedName,
        toggleFolder,
        addFolder,
        addNoteToFolder,
        deleteFolder,
        deleteNote,
        startEditingFolder,
        startEditingNote,
        saveEditing,
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};