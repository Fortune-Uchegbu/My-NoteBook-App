import { useOutletContext, useParams} from "react-router-dom"
import { useUpdateNote, useFormInput } from "../customhooks";

export const Input = ({ choice }) => {
  const {noteList,mobile,outLetClass} = useOutletContext();
  const { updateNote } = useUpdateNote();
  const { handleFormInput } = useFormInput();
  const { id } = useParams();
  const isEditing = choice === 'edit'; 
  const isViewing = choice === 'view';
  const note = noteList.find(val => val._id === id);


  return (
    <form 
    id="inputForm"
    className={`${outLetClass} h-full py-3 flex flex-col gap-y-4`}
    onSubmit={(e) => handleFormInput(e, id)}>
      <input 
      // readOnly = {isViewing ? true : false}
      type="text" 
      name="title" 
      // value={note.title}
      id="title"
      className="font-semibold w-full p-2 text-2xl focus:outline-border lg:w-3/5" 
      placeholder="Title" />

      <textarea 
      // readOnly = {isViewing ? true : false}
      type="text" 
      name="body" 
      value={note.body}
      className="p-2 grow text-left focus:outline-border"
      placeholder="Start writing"
      id="body" />

      <input 
      type="submit" 
      className="font-semibold bg-button text-button-text py-3 rounded-xl hover:brightness-85 active:brightness-85 md:w-75"
      value={isViewing ? 'Edit' : isEditing ? 'Save' : 'Add'} />
    </form>
  )
}

