import { LuMenu } from "react-icons/lu";
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";


export const Header = () => {
  const {setMenuOpen, noteList} = useContext(NoteContext);
  return (
    <header className='flex justify-between items-center px-default pb-3 border-b border-border'>
      <span className="font-medium text-2xl">{(noteList.length > 0) ? 'Notes' : 'NoteBook'}</span>
      <button className="lg:hidden p-2 hover:cursor-pointer" onClick={() => setMenuOpen(prev => !prev)}>
        <LuMenu className="w-6 h-6"/>
      </button>
    </header>
  )
}
