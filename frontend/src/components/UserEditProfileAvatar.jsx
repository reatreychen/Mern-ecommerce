import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import {updateAvatar} from "../store/counterSlice"
import { IoClose } from "react-icons/io5";
const UserEditProfileAvatar = ({close}) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();

  };
  const handleUplaodAvatar = async(e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
    formData.append("avatar", file);
    
    const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData
    })
    dispatch(updateAvatar(response.data))
    }catch(err) {
      console.log(err)
    }
  }
  return (
    <section className="fixed top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 w-full rounded-lg max-w-sm flex items-center justify-center flex-col gap-4">
        <button onClick={close} className="text-neutral-800 block w-fit ml-auto px-2">
          <IoClose size={20}/>
        </button>
        <div className="bg-red-500 w-16 h-16 flex items-center justify-center rounded-full overflow-hidden">
          {user ? (
            <img src={user.avatar} alt={user.name} className=" w-full h-full" />
          ) : (
            <FaRegUserCircle size={30} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="  cursor-pointer font-semibold border border-primary-100 hover:bg-primary-200 rounded-lg py-1 px-4 text-sm my-3">
              Upload
            </div>
          </label>
          <input onChange={handleUplaodAvatar} type="file" id="uploadProfile" className="hidden" />
        </form>
      </div>
    </section>
  );
};

export default UserEditProfileAvatar;
