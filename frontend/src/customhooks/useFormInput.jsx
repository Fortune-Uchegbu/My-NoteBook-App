import { useNavigate, useParams } from "react-router-dom";
import {v7 as genId} from 'uuid';
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import {api} from '../api/axiosConfig';

// function to recieve and handle create or edit inputs
export const useFormInput = () => {
    const navigate = useNavigate();
    const {noteData, dispatchNote} = useContext(NoteContext);

    const handleFormInput = async (e, id) => {
        e.preventDefault(); // stop default
        const isEditing = Boolean(id); // return true if id exists (editing)
        // extract form data
        const form = e.currentTarget;
        const formDataPairs = new FormData(form);
        const formDataObj = Object.fromEntries(formDataPairs);
        console.log(formDataObj)
        // process form data
        // 1. ensure no empty values & trim all pairs
        const processedPairsArr = Object.entries(formDataObj).map(([key, value]) => {
            if (!(value.trim())) {
                alert('All fields are required!');
                return [key, null];
           } else return [key, String(value).trim()];
        });
        
        // console.log(processedPairsArr)
        // 2. process values only when no pair is empty
        const nullValPresent = processedPairsArr.some(([key, value]) => (value === null));
        if (!nullValPresent) {
            // a. create note object
            const ID = (isEditing) ? String(id) : genId(); //gen new id if undefined
            const processedPairsObj = Object.fromEntries(processedPairsArr);
            // console.log(processedPairsObj)
            const data = {_id : ID, ...processedPairsObj}
            form.reset(); //clear form 

            // b. update state locally
            dispatchNote({
                type: (isEditing ? 'editNote' : 'createNote'),
                payload: data
            });

            // c. api call to update on backend server. Array of arrays
            const prevState = noteData; // prev state for rollback
            if (!isEditing) /*creating*/ {
                try {
                    const response = await api.post('/notes', JSON.stringify(processedPairsObj));
                    console.log(response.data.message); // "note created successfully!"
                } catch (error) {
                    console.error("Backend syncing failed! Rolling back changes...");
                    const serverErrorMessage = err.response?.data?.error || "Update failed";
                    alert(`Error: ${serverErrorMessage}. Reverting changes.`);
                    // use reducer to implement rollback
                    dispatchNote({
                        type: 'rollback',
                        payload: prevState
                    });
                }
                
            } else /*editing*/ {
                try {
                    const response = await api.put(`/notes/${id}`, JSON.stringify(processedPairsObj));
                    console.log(response.data.message); // "note edited successfully!"
                } catch (error) {
                    console.error("Backend syncing failed! Rolling back changes...");
                    const serverErrorMessage = err.response?.data?.error || "Update failed";
                    alert(`Error: ${serverErrorMessage}. Reverting changes.`);
                    // use reducer to implement rollback
                    dispatchNote({
                        type: 'rollback',
                        payload: prevState
                    });
                }
            }

            // return flow
            if (!isEditing) {
                navigate('/');
            } else return true;
        }
    };

  return {handleFormInput}
}