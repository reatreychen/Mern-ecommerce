import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setUserDetails } from "../store/counterSlice";
import { toast } from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UseMenu = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logOut });
      if (response.data.success) {
        close?.();
        dispatch(setUserDetails(null));
        localStorage.clear();
        toast.success("Logged Out Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  const handleClose = () => close?.();

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm font-normal flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name || user?.mobile}
          {user?.role === "ADMIN" && (
            <span className="lobster-regular text-red-500"> (Admin) </span>
          )}
        </span>
        <Link
          to="/dashboard/profile"
          onClick={handleClose}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-2">
        {isAdmin(user?.role) ? (
          <>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/category"
            >
              Category
            </Link>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/sub-category"
            >
              Sub Category
            </Link>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/upload-product"
            >
              Upload Product
            </Link>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/product"
            >
              Product
            </Link>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/myorder"
            >
              My Orders
            </Link>

            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/address"
            >
              Save Address
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/myorder"
            >
              My Orders
            </Link>

            <Link
              onClick={handleClose}
              className="px-2 font-normal hover:bg-primary-200 rounded py-1"
              to="/dashboard/address"
            >
              Save Address
            </Link>
          </>
        )}

        <button
          className="text-left bg-primary-200 rounded text-white font-semibold  hover:bg-primary-100 mr-2 px-3 py-1"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UseMenu;
