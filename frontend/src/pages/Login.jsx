import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import fetchUserDetail from "../utils/fetchUserDetail"
import {setUserDetails} from "../store/counterSlice"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data ,setData] = useState({
        email: "",
        password : "",
    })

    const [showPassword , setShowPassword] = useState(false)
    const handleChange = (e)=>{
        const {name, value} = e.target
        setData((pre)=>{
            return{
                ...pre,
                [name]: value
            }
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data,
            })
            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem("access_token" , response.data.access_token)
                localStorage.setItem("refresh_token" , response.data.refresh_token)
                setData({
                    email: "",
                    password: "",
                })
                const userDetails = await fetchUserDetail()
                dispatch(setUserDetails(userDetails.data))
                navigate("/")
            }
            if(response.error){
                toast.error(response.error.message)
            }
        }catch (error) {
            console.log(error.message)
        }
    }
  return (
    <section className='w-full container mx-auto px-2'>
        <div className=' bg-white my-4 w-full mx-auto max-w-lg rounded p-7'>
            <div className=' text-3xl text-center'>
                <h1 className='font-semibold font-sans'>Login</h1>
            </div>
            <form className=' grid gap-4 py-4' onSubmit={handleSubmit}>
                <div className=' grid gap-2 font-semibold px-2'>
                    <label htmlFor="email">Email :</label>
                    <input type="email" 
                    id='email'
                    value={data.email}
                    onChange={handleChange}
                    className=' bg-blue-50 p-2 rounded outline-none focus:border-primary-200'
                    name='email' placeholder='Enter Your Email'/>
                </div>
                <div className=' grid gap-2 font-semibold'>
                    <label htmlFor="password">Password :</label>
                    <div className=' flex items-center bg-blue-50 px-2'>
                        <input 
                        id='password'
                        type= {showPassword ? "text" : "password"}
                        value={data.password} 
                        onChange={handleChange}
                        className=' bg-blue-50 w-full rounded p-2 outline-none'
                        name='password' placeholder='Enter Your Password'/>
                        <div onClick={()=>setShowPassword(pre=>!pre)} className=' cursor-pointer text-xl hover:text-primary-200'>
                            {
                                showPassword ? (
                                    <FaRegEye />
                                ):(
                                    <FaRegEyeSlash />
                                )
                            }
                        </div>
                    </div>
                </div>
                <button className=' bg-green-800 py-2 rounded hover:bg-green-700 text-xl font-semibold text-white hover:text-primary-100'>Login</button>
            </form>
            <p>
                Dont't have account? 
                <Link to={'/register'} className=' font-semibold text-green-700 hover:text-green-800 '>
                    Register
                </Link>
            </p>
        </div>
    </section>
  )
}

export default Login