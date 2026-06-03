import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { FaTrash } from "react-icons/fa";
// import { noteReducer } from "../reducers/noteReducer";
// import { useUpdateNote } from "../customhooks/useUpdateNote";
import { NavLink } from "react-router-dom";


export const List = () => {
  const {noteData, dispatchNote, menuOpen, setMenuOpen, mobile} = useContext(NoteContext);
  const noteList = noteData.noteList;
  // const {updateNote} = useUpdateNote();
  const handleCardClick = () => {
    if (mobile) setMenuOpen(false);
  }


  return (
    <ul className="flex flex-col gap-y-3">
      {noteList.map((note) => (
        <li 
        className="noteItem w-full shadow border border-border rounded-xl flex justify-between items-center gap-x-6 min-w-0 hover:cursor-pointer active:"
        key={note._id}>
          <NavLink className={'grow rounded-xl'} onClick={handleCardClick} to={`note/${note._id}`}>
            <div className="w-full py-4 pl-4">
              <h2 className="line-clamp-1 wrap-break-word font-semibold">{note.title}</h2>
              <p className="line-clamp-1 wrap-break-word">{note.body}</p>
            </div>
          </NavLink>
          <button 
          className="p-6 cursor-pointer w-fit rounded-full hover:brightness-75 active:bg-border shrink-0" 
          onClick={() => dispatchNote({type: 'deleteNote', payload: note})}>
              <FaTrash className="w-4 h-4"/>
          </button>
        </li>
      ))}
    </ul>
  )
}
