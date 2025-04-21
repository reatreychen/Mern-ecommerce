import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password do not match");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login")
      }
      if (response.error) {
        toast.error(response.error.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h1 className=" text-center font-semibold">Welcome</h1>
        <form className=" grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className=" grid gap-1">
            <label htmlFor="name" className="font-normal">
              Name :
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter your name"
              autoFocus
              className=" border bg-blue-50 rounded outline-none p-2 font-normal"
            />
          </div>

          <div className=" grid gap-1">
            <label htmlFor="email" className=" font-normal">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoFocus
              className=" border bg-blue-50 rounded outline-none p-2 font-normal"
            />
          </div>

          <div className=" grid gap-1">
            <label htmlFor="password" className=" font-normal">
              Password :
            </label>
            <div className=" bg-blue-50 p-2 border rounded flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-blue-50 font-normal"
              />
              <div
                className=" cursor-pointer"
                onClick={() => setShowPassword((pre) => !pre)}
              >
                {showPassword ? (
                  <FaRegEyeSlash size={24} />
                ) : (
                  <FaRegEye size={24} />
                )}
              </div>
            </div>
          </div>

          <div className=" grid gap-1">
            <label htmlFor="confirmpassword" className=" font-normal">
              ConfirmPassword
            </label>
            <div className=" flex items-center bg-blue-50 p-2 border rounded">
              <input
                type={confirmShowPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your confirmpassword"
                className="w-full outline-none bg-blue-50 font-normal"
              />
              <div
                className="cursor-pointer"
                onClick={() => setConfirmShowPassword((pre) => !pre)}
              >
                {confirmShowPassword ? (
                  <FaRegEyeSlash size={24} />
                ) : (
                  <FaRegEye size={24} />
                )}
              </div>
            </div>
          </div>
          <button className=" bg-green-700 py-2 rounded hover:text-white hover:bg-green-800 transition-all ease-in-out font-semibold">
            Register
          </button>
        </form>
        <p>
                Dont't have account? 
                <Link to={'/login'} className=' font-semibold text-green-700 hover:text-green-800 '>
                    Login
                </Link>
            </p>
      </div>
    </section>
  );
};

export default Register;
