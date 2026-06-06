import { v7 as genId } from 'uuid';

export const formatFormData = (rawDataPairs) => {
    // ensure no empty values & trim all pairs
    const processedPairs = rawDataPairs.map(([key, value]) => {
        if (!(value.trim())) {
            alert('All fields are required!');
            return [key, null];
        } else return [key, String(value).trim()];
    });

    // final data obj
    const nullValPresent = processedPairs.some(([key, value]) => (value === null));
    if (!nullValPresent) {
        const preDataObj = Object.fromEntries(processedPairs);

        // create note object
        const isEditing = Boolean(id);
        const ID = (isEditing) ? String(id) : genId(); //gen new id if no existing one
        return {
            isEditing: isEditing,
            noteObj: {_id : ID, ...preDataObj}
        };
    }
};