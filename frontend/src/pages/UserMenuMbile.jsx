import UseMenu from '../components/UseMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMbile = () => {
  return (
    <section className=' bg-white h-full w-full py-2'>
      <button onClick={()=> window.history.back()} className=' text-neutral-800 block w-fit ml-auto px-2'>
        <IoClose size={25} />
      </button>
      <div className=' mx-auto container p-3'>
      <UseMenu/>
    </div>
    </section>
  )
}

export default UserMenuMbile