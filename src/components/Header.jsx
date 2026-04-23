import { LuMenu } from "react-icons/lu";
import { useState } from "react";


export const Header = ({ setIsOpen}) => {
  return (
    <header className='flex justify-between items-center'>
      <span className="font-medium text-2xl">NoteBook</span>
      <button className="md:hidden p-2" onClick={() => setIsOpen(prev => !prev)}>
        <LuMenu className="w-6 h-6"/>
      </button>
    </header>
  )
}
