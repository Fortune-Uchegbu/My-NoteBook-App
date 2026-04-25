import { useOutletContext, useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export const Home = () => {
  const {noteList, mobile, outLetClass} = useOutletContext();
  return (
    < >
      {(noteList && noteList.length === 0) && 
      <div className={`grid place-content-center h-full text-center relative grow ${outLetClass}`}>
        <p>You haven't added any notes yet.</p>
        <p>{`${mobile ? 'Tap' : 'Click'} '+' button to create.`}</p>

        <button className="p-2 w-fit absolute bottom-12 right-6 bg-button rounded-2xl text-button-text hover:brightness-75 active:brightness-75 hover:cursor-pointer">
          <IoAdd className="w-8 h-8"/>
        </button>

      </div>
      }
    </>
  )
}
