import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/logic/api/api";

const Note = async ({
  params
}) => {
  const { id } = (await params);
  console.log(id);
  
  return (
    <NoteEditor id={id} />
  )
}

export default Note;
