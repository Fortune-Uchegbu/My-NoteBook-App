import React from 'react';
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const DarkLayer = ({mobile}) => {
  const {menuOpen, setMenuOpen} = useContext(NoteContext);
  return (
    <div 
    onClick={() => {if(menuOpen) setMenuOpen(false)}}
    className={`
    fixed inset-0 z-50 bg-black transition-opacity duration-400 
    ${menuOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    `}>
    </div>
  )
}

export default DarkLayer