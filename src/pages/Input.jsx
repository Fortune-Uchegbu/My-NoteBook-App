import { useOutletContext, useParams} from "react-router-dom"
import { useFormInput } from "../customhooks";
import { useState, useRef, useEffect } from 'react'

export const Input = ({ choice }) => {
  const titleRef = useRef(null);
  const { id } = useParams();
  const {noteData,outLetClass} = useOutletContext();
  const noteList = noteData.noteList;
  const note = noteList.find(val => val._id === id);
  const [isEditing, setIsEditing] = useState(choice === 'edit');
  const [isCreating, setIsCreating] = useState(choice === 'new');
  const [isViewing, setIsViewing] = useState(choice === 'view');
  const [ title, setTitle ] = useState(isCreating ? '' : note.title);
  const [ body, setBody ] = useState(isCreating ? '' : note.body);

  // const initialState = {
  //   title: '',
  //   content: '',
  //   isCreating: false,
  //   isEditing: false,
  //   isViewing: false,
  //   error: null
  // };


  useEffect(() => {
    titleRef.current?.focus();
  }, [isEditing, isViewing])
  const { handleFormInput } = useFormInput();
  const handleClick = (e) => {
    if(isViewing) {
      e.preventDefault();
      setIsViewing(false);
      setIsEditing(true);
    }
  }

  return (
    <form 
    id="inputForm"
    className={`${outLetClass} h-full py-3 flex flex-col gap-y-4`}
    onSubmit={(e) => { 
      e.preventDefault();
      if(!isViewing) {
        const editing = handleFormInput(e, id);
        // form view flow for editing case
        if (editing) {
          setIsEditing(false);
          setIsViewing(true);
        }
      }
    }}>
      <input 
      ref={titleRef}
      readOnly = {isViewing ? true : false}
      type="text" 
      name="title"
      value={title} 
      onChange={(e) => setTitle(e.target.value)}
      id="title"
      className="font-semibold w-full p-2 text-2xl focus:outline-border lg:w-3/5" 
      placeholder="Title" />

      <textarea 
      readOnly = {isViewing ? true : false}
      type="text" 
      name="body" 
      value={ body} 
      onChange={(e) => setBody(e.target.value)}
      className="p-2 grow text-left focus:outline-border"
      placeholder="Start writing"
      id="body" />

      <input 
      type={ isViewing ? 'button' : 'submit' }
      onClick={handleClick}
      className="font-semibold bg-button text-button-text py-3 rounded-xl hover:brightness-85 hover:cursor-pointer active:brightness-85 md:w-75"
      value={isViewing ? 'Edit' : isEditing ? 'Save' : 'Add'} />
    </form>
  )
}

