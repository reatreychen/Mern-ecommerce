import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserEditProfileAvatar from "../components/UserEditProfileAvatar";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import fetchUserDetail from "../utils/fetchUserDetail"
import { setUserDetails } from "../store/counterSlice";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    })
},[user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetail,
        data: userData,
      })
      setLoading(false)
      const dataResponse = response.data
      if(dataResponse.success){
        toast.success(dataResponse.message)
        const userData = await fetchUserDetail()
        dispatch(setUserDetails(userData.data))
      }
    }catch (e) {
      console.log(e)
    }
  };
  return (
    <div className=" p-4">
      {/* profile upload image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user ? (
          <img src={user.avatar} alt={user.name} className=" w-full h-full" />
        ) : (
          <FaRegUserCircle size={30} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm border px-3 py-1 rounded-full border-primary-100 mt-3 font-normal hover:bg-primary-200"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserEditProfileAvatar close={() => setOpenProfileAvatarEdit(false)} />
      )}

      {/* name, phone, email */}
      <form className="my-4" onSubmit={handleSubmit}>
        <div className=" grid gap-1">
          <label htmlFor="name" className="font-normal">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className=" border outline-none p-2 bg-slate-50 rounded w-full font-normal"
            name="name"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className=" grid gap-1">
          <label htmlFor="email" className="font-normal">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className=" border outline-none p-2 bg-slate-50 rounded w-full font-normal"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className=" grid gap-1 my-2">
          <label htmlFor="mobile" className="font-normal">
            Phone:
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className=" border outline-none p-2 bg-slate-50 rounded w-full font-normal"
            name="mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>
      
        <button className=" border px-4 py-2 font-semibold border-primary-200 rounded hover:bg-primary-100 hover:text-white my-2">
          {
            loading? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;
