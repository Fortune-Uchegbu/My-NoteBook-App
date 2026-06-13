export const initialNoteData = {
    noteList: [],
};
export const initializeState = () => {
    // const savedNotes = await api.get('/notes');
    // console.log(savedNotes.data)
    return initialNoteData;
        // noteList: savedNotes ? savedNotes.data : []
    
}
export const noteReducer = (state, action) => {
    switch (action.type) {
        case 'loadNote':
            return {
                ...state,
                noteList: action.payload
            }
        case 'createNote':
            return {
                ...state, 
                noteList: [...state.noteList, action.payload]
            };
        case 'editNote':
            return {
                ...state, 
                noteList: state.noteList.map(note => (note._id === action.payload._id) ? action.payload : note)
            };
        case 'deleteNote':
            return {
                ...state, 
                noteList: state.noteList.filter(note => note._id !== action.payload._id)
            };
        case 'rollback':
            return action.payload;
        default:
            console.log('an error occured in updateNote function');
            return state;
 
    }
}