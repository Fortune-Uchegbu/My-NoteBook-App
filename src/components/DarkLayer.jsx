import React from 'react';
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const DarkLayer = ({mobile}) => {
  const {menuOpen, setMenuOpen} = useContext(NoteContext);
  return (
    <>{mobile && 
        <div 
        onClick={() => {if(menuOpen) setMenuOpen(false)}}
        className={`fixed z-50 ${menuOpen && 'inset-0 bg-black opacity-40'}`}>
        </div>
    }</>
  )
}

export default DarkLayer