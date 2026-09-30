import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { deleteNote } from '../api/noteServices';


// custom hook to handle notelist functions - deleting and reading
export const useNoteList =  () => {
    const {noteData, dispatchNote} = useContext(NoteContext);
    
    // delete handler
    const handleDelete = async(note) => {
        const prevState = noteData; // prev state for rollback
        
        // optimistic update
        dispatchNote({
            type: 'deleteNote', 
            payload: note
        }); 

        // backend syncing
        try {
            await deleteNote(note._id);
        } catch (error) {
            console.error("Backend syncing failed:", error);
            const serverErrorMessage = err.response?.data?.error || "Failed to delete note.";
            alert(`Error: ${serverErrorMessage} Reverting changes.`);
            // reducer rollback
            dispatchNote({
                type: 'rollback',
                payload: prevState
            });
        }
    }
    return { handleDelete }
}