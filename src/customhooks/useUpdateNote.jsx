import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useUpdateNote = (data, choice) => {
  const {noteList, setNoteList} = useContext(NoteContext);
  const updateNote = (data) => {
    const newNoteList = (noteList.length === 0) ? [data] /* initial */ : 
    (choice) ? (noteList.map(val => (val.id === data.id) ? data : val )) /* editing */ : 
    [...noteList, data] /* creating */;
    setNoteList(newNoteList); //update state
  }
  return {updateNote}
}
