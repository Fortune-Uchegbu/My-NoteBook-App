import react, { createContext, useState, useEffect } from "react";
// import { toggleTheme } from "../utils";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {
    // states
    const [noteList, setNoteList] = useState(() => {
        const savedNotes = localStorage.getItem('noteList');
        return savedNotes ? JSON.parse(savedNotes) : []
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        localStorage.setItem('noteList', JSON.stringify(noteList));
    }, [noteList])
    
    // value obj
    const val = {noteList, setNoteList, menuOpen, setMenuOpen, windowSize, setWindowSize}

    return (
        <NoteContext value={val}>
            {children}
        </NoteContext>
    )
}