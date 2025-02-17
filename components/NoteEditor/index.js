'use client';
import { getNote, updateNote } from "@/logic/api/api";
import useDebounce from "@/logic/hooks/useDebounce";
import useRequest from "@/logic/hooks/useRequest";
import { useCallback } from "react";

/**
 * @param {{id: string}} props - Component props
 * @param {string} props.id - The ID of the note to edit
 */
const NoteEditor = ({ id }) => {
  const fetcher = useCallback(() => getNote(id), [id]);
  const { data, error, loading } = useRequest(fetcher);
  const { debounce } = useDebounce(500);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Note not found</div>;

  const handleChange = (e) => debounce(async () => {
    const newContent = e.target.value;
    await updateNote({ ...data, content: newContent });
  });

  return (
    <div>
      <h2>{data.title}</h2>
      <textarea defaultValue={data.content} onChange={handleChange}>
      </textarea>
    </div>
  )
};

export default NoteEditor;
