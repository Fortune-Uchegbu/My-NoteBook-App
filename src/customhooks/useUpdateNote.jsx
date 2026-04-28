import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useUpdateNote = (data, choice) => {
  const {noteList, setNoteList} = useContext(NoteContext);
  const updateNote = (data) => {
    if (noteList.length === 0) /* initial */ {
      setNoteList([data])
    } else if (choice) /* editing */ {
      const newNoteList = noteList.map(val => (val.id === data.id) ? data : val );
      setNoteList(newNoteList);
    } else /* creating */ {
      const newNoteList = [...noteList, data];
      setNoteList(newNoteList);
    }
  }
  return {updateNote}
}
