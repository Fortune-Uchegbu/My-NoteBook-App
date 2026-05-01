import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useUpdateNote } from "../customhooks/useUpdateNote";
export const Home = () => {
  const {noteList, mobile, outLetClass} = useOutletContext();
  const navigate = useNavigate();
  const {updateNote} = useUpdateNote();

  const handleDelete = (id) => {
    const itemToDel = noteList.find(val => val._id === id);
    updateNote(itemToDel, 'delete')
  }

  return (
    <>
      {(noteList && noteList.length === 0) && 
        <div className={`grid place-content-center h-full text-center relative ${outLetClass}`}>
          <p>You haven't added any notes yet.</p>
          <p>{`${mobile ? 'Tap' : 'Click'} '+' button to create.`}</p>
        </div>
      }
      {(noteList && noteList.length > 0) &&
        <section className={`flex flex-col gap-y-3 py-3 ${outLetClass}`}>
          {/* <h1 className="font-semibold text-xl">Notes</h1> */}

          <ul className="flex flex-col gap-y-3">
            {noteList.map((note) => (
              <li 
              className="noteItem w-full shadow border border-border p-4 rounded-xl flex justify-between items-center gap-x-6 min-w-0"
              key={note._id}>
                <div className="min-w-0">
                  <h2 className="line-clamp-1 wrap-break-word font-semibold">{note.title}</h2>
                  <p className="line-clamp-1 wrap-break-word">{note.body}</p>
                </div>
                <button 
                className="p-2 cursor-pointer w-fit rounded-full hover:brightness-75 active:bg-border shrink-0" 
                onClick={() => handleDelete(note._id)}>
                    <FaTrash className="w-4 h-4"/>
                </button>
              </li>
            ))}
          </ul>
        </section>
      }

      <button 
      onClick={() => navigate('/note/new')}
      className="p-2 w-fit absolute bottom-15 right-6 bg-button rounded-2xl text-button-text hover:brightness-75 active:brightness-75 hover:cursor-pointer">
        <IoAdd className="w-8 h-8"/>
      </button>
    </>
  )
}
