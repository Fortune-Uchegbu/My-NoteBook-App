// My first reducer
export const initialNoteData = {
    noteList: [],
};
export const initializeState = () => {
    const savedNotes = localStorage.getItem('noteList');
    return {
        noteList: savedNotes ? JSON.parse(savedNotes) : []
    }
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
        default:
            console.log('an error occured in updateNote function');
            return state;
 
    }
}