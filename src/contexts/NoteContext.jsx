import react, { createContext, useState, useEffect, useReducer } from "react";
import { noteReducer, initialNoteData, initializeState } from "../reducers/noteReducer";
// import { toggleTheme } from "../utils";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {
    // states
    const [noteData, dispatchNote] = useReducer(noteReducer, initialNoteData, initializeState)
    // set data to localstorage for every update
    useEffect(() => {
        localStorage.setItem('noteList', JSON.stringify(noteData.noteList));
    }, [noteData.noteList])

    const [menuOpen, setMenuOpen] = useState(false);
    // window resize
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        // Clean up listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const mobile = windowSize.width < 1024; //screensize
    
    // value obj
    const val = {noteData, dispatchNote, menuOpen, setMenuOpen, windowSize, setWindowSize, mobile}

    return (
        <NoteContext value={val}>
            {children}
        </NoteContext>
    )
}