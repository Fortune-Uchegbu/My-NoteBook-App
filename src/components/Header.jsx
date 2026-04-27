import { LuMenu } from "react-icons/lu";


export const Header = ({ setIsOpen}) => {
  return (
    <header className='flex justify-between items-center px-default pb-3 border-b border-border'>
      <span className="font-medium text-2xl">NoteBook</span>
      <button className="lg:hidden p-2 hover:cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
        <LuMenu className="w-6 h-6"/>
      </button>
    </header>
  )
}
