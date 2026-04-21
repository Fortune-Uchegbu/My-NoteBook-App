import { Outlet, useParams, useLocation, Link } from 'react-router-dom'
import {ViewNote, Input} from './'
export const Note = ({choice}) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isViewing = choice === 'view';
  const isEditing = pathname.endsWith('/edit');
  const isCreating = id === 'new';
  return (
    <>
    {
      isViewing && <ViewNote />
    }
    {
      isCreating && 
      <Input choice={choice} />
    }
    {
      isEditing && 
      <Input choice={choice} />
    }
    </>
  )
}
