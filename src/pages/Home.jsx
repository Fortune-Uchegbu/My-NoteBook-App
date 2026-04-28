import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export const Home = () => {
  const {noteList, mobile, outLetClass} = useOutletContext();
  const navigate = useNavigate();
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
              className="noteItem w-full border border-button p-4 rounded-xl"
              key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.body}</p>
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
