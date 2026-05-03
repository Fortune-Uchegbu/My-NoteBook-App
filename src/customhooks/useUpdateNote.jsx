import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useUpdateNote = () => {
  const {noteList, setNoteList} = useContext(NoteContext);
  const updateNote = (data, choice) => {
    let newList;
    switch (choice) {
      case 'new':
        newList = [...noteList, data];
        break;
      case 'edit':
        newList = noteList.map(val => (val._id === data._id) ? data : val );
        break;
      case 'delete':
        newList = noteList.filter(val => (val._id !== data._id));
        break;
      default:
        console.log('an error occured in updateNote function');
    }
    // set the list as new state
    setNoteList(newList); //update state
  }
  return {updateNote}
}
