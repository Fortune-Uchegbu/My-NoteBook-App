import { createContext, useState, useEffect, useReducer, useMemo } from "react";
import { noteReducer, initialNoteData } from "../reducers/noteReducer";
import { getAllNotes } from '../api/noteServices'

export const NoteContext = createContext(null);
export const UIContext = createContext(null);

export const NoteDataProvider = ({ children }) => {
    const [noteData, dispatchNote] = useReducer(noteReducer, initialNoteData);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const savedNotes = await getAllNotes();
                // console.log(savedNotes);
                dispatchNote({
                    type: 'loadNote',
                    payload: savedNotes.data,
                });
            } catch (err) {
                console.error("Failed to load initial notes:", err);
            }
        };

        fetchNotes();
    }, []);

    const value = useMemo(() => ({
        noteData,
        dispatchNote,
    }), [noteData, dispatchNote]);

    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
};

export const UIProvider = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
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

    const mobile = windowSize.width < 1024;

    const value = useMemo(() => ({
        menuOpen,
        setMenuOpen,
        windowSize,
        setWindowSize,
        mobile,
    }), [menuOpen, windowSize, mobile]);

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};

export const NoteProvider = ({ children }) => {
    return (
        <NoteDataProvider>
            <UIProvider>
                {children}
            </UIProvider>
        </NoteDataProvider>
    );
};