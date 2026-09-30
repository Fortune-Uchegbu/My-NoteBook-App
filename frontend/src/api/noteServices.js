import { api } from './axiosConfig';

export const getAllNotes = async () => {
    const response = await api.get('/');
    return response;
}

export const createNote = async (noteObj) => {
    const response = await api.post('/create', JSON.stringify(noteObj));
    return response;
}

export const updateNote = async (id, noteObj) => {
    await api.patch(`/edit/${id}`, JSON.stringify(noteObj));
}

export const deleteNote = async (id) => {
    await api.delete(`/delete/${id}`);
}