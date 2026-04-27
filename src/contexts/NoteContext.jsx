import { Children, createContext, useState } from "react";
// import { toggleTheme } from "../utils";

export const NoteContext = createContext();

export const NoteProvider = () => {
    // states
    const [noteList, setNoteList] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    // value obj
    const val = {noteList, setNoteList, menuOpen, setMenuOpen, windowSize, setWindowSize}

    return (
        <NoteContext value={val}>
            {Children}
        </NoteContext>
    )
}