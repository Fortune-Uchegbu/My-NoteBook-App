import { api } from './axiosConfig';

export const getAllNotes = async () => {
    const response = await api.get('/');
    console.log(response);
    return response;
}

export const createNote = async (noteObj) => {
    console.log("hhhhh");
    const response = await api.post('/create', noteObj);
    // console.log(response);
    return response;
}

export const updateNote = async (id, noteObj) => {
    await api.patch(`/edit/${id}`, noteObj);
    // console.log(response);
}

export const deleteNote = async (id) => {
    await api.delete(`/delete/${id}`);
}