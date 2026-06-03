import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { List } from "../components";

export const Home = () => {
  const {noteData, mobile, outLetClass} = useOutletContext();
  const navigate = useNavigate();
  const noteList = noteData.noteList;
  

  return (
    <>
      {(noteList && noteList.length === 0) && 
        <div className={`grid place-content-center h-full text-center relative ${outLetClass}`}>
          <p>You haven't added any notes yet.</p>
          <p>{`${mobile ? 'Tap' : 'Click'} '+' button to create.`}</p>
        </div>
      }
      {(!mobile && noteList && noteList.length > 0) && 
        <div className={`grid place-content-center h-full text-center relative ${outLetClass}`}>
          <p>{`${mobile ? 'Tap' : 'Click'} '+' button to add a note.`}</p>
        </div>
      }
      {(mobile && noteList && noteList.length > 0) &&
        <div className={`flex flex-col gap-y-3 overflow-y-scroll py-3 ${outLetClass}`}>
          {/* <h1 className="font-semibold text-xl">Notes</h1> */}
          <List />
        </div>
      }

      <button 
      onClick={() => navigate('/note/new')}
      className="p-2 w-fit absolute bottom-15 right-6 bg-button rounded-2xl text-button-text hover:brightness-75 active:brightness-75 hover:cursor-pointer">
        <IoAdd className="w-8 h-8"/>
      </button>
    </>
  )
}
