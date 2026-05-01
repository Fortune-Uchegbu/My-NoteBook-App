import { useOutletContext, useParams, useNavigate } from "react-router-dom"
import {v7 as genId} from 'uuid';
import { useUpdateNote } from "../customhooks/useUpdateNote";

export const Input = ({ choice }) => {
  const navigate = useNavigate();
  const {noteList,mobile,outLetClass} = useOutletContext();
  const { updateNote } = useUpdateNote();
  // determine state of choice
  const { id } = useParams();
  const isEditing = Boolean(id);  // acess id param accordingly
  // submit handler
  const HandleFormInput = (e) => {
    e.preventDefault();
    const form = document.getElementById('inputForm');
    const rawData = new FormData(form);
    const rawDataPairs = Array.from(rawData);
    const trimmedDataPairs = rawDataPairs.map(([key, value]) => [key,
      (typeof value === 'string' ) ? value.trim() : value
    ]);
    const rawDataObj = Object.fromEntries(trimmedDataPairs);
    // Ensure both inputs are filled
    const hasEmpty = Object.values(rawDataObj).some(val => !(val.trim()));
    if (hasEmpty) {
      alert('All fields are required!');
      return;
    }
    // Add id appropriately.
    const ID = isEditing ? id : genId();
    const data = {_id : ID, ...rawDataObj}
    form.reset();
    updateNote(data, choice);
    navigate('/'); //return back to home page
  };

  return (
    <form 
    id="inputForm"
    className={`${outLetClass} h-full py-3 flex flex-col gap-y-4`}
    onSubmit={HandleFormInput}>
      <input 
      type="text" 
      name="title" 
      id="title"
      className="font-semibold w-full p-2 text-2xl focus:outline-border lg:w-3/5" 
      placeholder="Title" />

      <textarea 
      type="text" 
      name="body" 
      className="p-2 grow text-left focus:outline-border"
      placeholder="Start writing"
      id="body" />

      <input 
      type="submit" 
      className="font-semibold bg-button text-button-text py-3 rounded-xl hover:brightness-85 active:brightness-85 md:w-75"
      value={isEditing ? 'Save' : 'Add'} />
    </form>
  )
}

