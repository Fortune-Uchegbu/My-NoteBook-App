import { HandleFormInput } from "../utils"
import { useOutletContext, useParams } from "react-router-dom"

export const Input = ({ choice }) => {
  // determine state of choice
  const { id } = useParams();
  const isEditing = Boolean(id);  // acess id param accordingly

  const {noteList,mobile,outLetClass} = useOutletContext();
  return (
    <form 
    id="inputForm"
    className={`${outLetClass} h-full py-3 flex flex-col gap-y-4`}
    onSubmit={(e) => HandleFormInput(e, id)}>
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

