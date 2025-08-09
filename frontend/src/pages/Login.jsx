import React, { useEffect, useMemo, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import { baseURL } from '../common/SummaryApi'
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
                const at = response?.data?.data?.access_token
                const rt = response?.data?.data?.refresh_token
                if (at) localStorage.setItem("access_token" , at)
                if (rt) localStorage.setItem("refresh_token" , rt)
                setData({
                    email: "",
                    password: "",
                })
                const userDetails = await fetchUserDetail()
                dispatch(setUserDetails(userDetails.data))
                navigate("/")
            }
  // If redirected back from Google with tokens in query, store them and fetch user
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const at = params.get('access_token')
    const rt = params.get('refresh_token')
    if (at && rt) {
      localStorage.setItem('access_token', at)
      localStorage.setItem('refresh_token', rt)
      ;(async () => {
        const userDetails = await fetchUserDetail()
        if (userDetails?.data) {
          dispatch(setUserDetails(userDetails.data))
          navigate('/')
        }
      })()
    }
  }, [])
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
            {/* google login */}
            <div className='py-4'>
                <a
                  href={`${baseURL}/api/passport/auth/google`}
                  className='w-full inline-flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-50'
                >
                  <img src='https://developers.google.com/identity/images/g-logo.png' alt='Google' className='w-5 h-5'/>
                  <span className='font-semibold'>Continue with Google</span>
                </a>
            </div>
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