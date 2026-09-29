import { LuMenu } from "react-icons/lu";
import { useContext } from "react";
import { NoteContext, UIContext } from "../contexts/NoteContext";


export const Header = ({classes}) => {
  const { noteData } = useContext(NoteContext);
  const { setMenuOpen } = useContext(UIContext);
  const noteList = noteData.noteList;
  return (
    <header className={`flex justify-between items-center px-default py-2 border-b border-border ${classes}`}>
      <span className="font-medium text-2xl">{(noteList.length > 0) ? 'Notes' : 'NoteBook'}</span>
      <button className="lg:hidden p-2 hover:cursor-pointer" onClick={() => setMenuOpen(prev => !prev)}>
        <LuMenu className="w-6 h-6"/>
      </button>
    </header>
  )
}
