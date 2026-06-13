import { useNavigate, useParams } from "react-router-dom";
import {v7 as genId} from 'uuid';
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import {api} from '../api/axiosConfig';

// function to recieve and handle create or edit inputs
export const useFormInput = () => {
    const navigate = useNavigate();
    const {noteData, dispatchNote} = useContext(NoteContext);
    const noteList = noteData.noteList;

    const handleFormInput = async (e, id) => {
        e.preventDefault(); // stop default
        const isEditing = Boolean(id); // return true if id exists (editing)

        // extract form data
        const form = document.getElementById('inputForm');
        const rawData = new FormData(form); //get inputed data object
        const rawDataPairs = Array.from(rawData);
        // console.log(rawDataPairs);

        // process form data - frontend version
        // ensure no empty values & trim all pairs
        const processedPairs = rawDataPairs.map(([key, value]) => {
           if (!(value.trim())) {
                alert('All fields are required!');
                return [key, null];
           } else return [key, String(value).trim()];
        });
        // processed data obj
        const nullValPresent = processedPairs.some(([key, value]) => (value === null));
        if (!nullValPresent) {
            const preDataObj = Object.fromEntries(processedPairs);

            // create note object
            const ID = (isEditing) ? String(id) : genId(); //gen new id if undefined
            const data = {_id : ID, ...preDataObj}
            form.reset();

            //update state locally first
            dispatchNote({
                type: (isEditing ? 'editNote' : 'createNote'),
                payload: data
            });

            // api call to update on backend server. Array of arrays
            const prevState = noteData; // prev state for rollback
            if (!isEditing) /*creating*/ {
                try {
                    const response = await api.post('/notes', rawDataPairs);
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
                    const response = await api.put(`/notes/${id}`, rawDataPairs);
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