import { useNavigate, useParams } from "react-router-dom";
import {v7 as genId} from 'uuid';
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useFormInput = () => {
    // function to recieve and handle create or edit inputs
    const navigate = useNavigate();
    const {noteData, dispatchNote} = useContext(NoteContext);
    const noteList = noteData.noteList;

    const handleFormInput = (e, id) => {
        e.preventDefault(); // stop default
        // extract form data
        const form = document.getElementById('inputForm');
        const rawData = new FormData(form); //get inputed data object
        const rawDataPairs = Array.from(rawData);
        console.log(rawDataPairs);
        // api call - backend (to practice pessimistic state updates)
        // send raw data iterable object


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
            const isEditing = Boolean(id); // return true if id exists (editing)
            const ID = (isEditing) ? String(id) : genId(); //gen new id if undefined
            const data = {_id : ID, ...preDataObj}
            form.reset();

            //update state
            dispatchNote({
                type: (isEditing ? 'editNote' : 'createNote'),
                payload: data
            });

            // return flow
            if (!isEditing) {
                navigate('/');
            } else return true;
        }
    };

  return {handleFormInput}
}