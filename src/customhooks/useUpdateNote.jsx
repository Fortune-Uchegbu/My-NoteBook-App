import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useUpdateNote = () => {
  const {noteList, setNoteList} = useContext(NoteContext);
  const updateNote = (data, choice) => {
    let newList;
    console.log(choice);
    console.log(noteList);
    console.log(newList);
    switch (choice) {
      case 'new':
        newList = [...noteList, data];
        console.log(newList)
        break;
      case 'edit':
        newList = noteList.map(val => (val._id === data._id) ? data : val );
        console.log(newList);
        break;
      case 'delete':
        newList = noteList.filter(val => (val._id !== data._id));
        console.log(newList);
        break;
      default:
        console.log('an error occured in updateNote function')
    }
    // set the list as new state
    console.log(newList)
    setNoteList(newList); //update state
  }
  return {updateNote}
}
