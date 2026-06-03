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
        // get and process form data
        const form = document.getElementById('inputForm');
        const rawData = new FormData(form); //get inputed data object
        // trim of whitespaces in inputs
        const rawDataPairs = Array.from(rawData);
        const trimmedDataPairs = rawDataPairs.map(([key, value]) => [key,
        (typeof value === 'string' ) ? value.trim() : value
        ]);
        // processed data obj
        const rawDataObj = Object.fromEntries(trimmedDataPairs);

        // Ensure both inputs are filled
        const hasEmpty = Object.values(rawDataObj).some(val => !(val.trim()));
        if (hasEmpty) {
            alert('All fields are required!');
            return;
        }

        // add id appropriately
        const isEditing = Boolean(id); // return true if id exists 
        const ID = (isEditing) ? String(id) : genId(); //gen new id if undefined
        const data = {_id : ID, ...rawDataObj}
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
        console.log('form handler ran!')
    };

  return {handleFormInput}
}