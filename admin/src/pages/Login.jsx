import React, { useContext, useState } from 'react'
import Logo from "../assets/vcart logo.png"
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../context/AuthContex';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [show,setShow] = useState("")
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    let {serverUrl} =useContext(authDataContext)
    let {adminData,getAdmin} = useContext(adminDataContext)
    let navigate = useNavigate()

    const  AdminLogin = async (e) =>{
      e.preventDefault()
      try{
        const result = await axios.post(serverUrl + '/api/auth/adminlogin',
          {email,password},{withCredentials:true})
          console.log(result.data)
          getAdmin()
          navigate("/")
      }catch(e){
        console.log(e) 
      }
    }

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2825] text-white flex flex-col items-center justify-start">
          <div
            className="w-[100%] h-[80px] flex items-center justify-start px-[30px]  gap-[10px] 
                   cursor-pointer"
           
          >
            <img className="w-[40px]" src={Logo} alt="" />
            <h1 className="text-[22px] font-sans">OneCart</h1>
          </div>
          <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
            <span className="text-[25px] font-semibold">Login Page</span>
            <span className="text-[16px]">
              Welcome to OneCart,Apply to Admin Login
            </span>
          </div>
          <div
            className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blure-2xl rounded-lg shadow-lg
                    flex items-center justify-center"
          >
            <form
              action="" onSubmit={AdminLogin}
              className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
            >
              <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
                <input type="text" 
                  className="w-[100%] h-[50px] border-[2px] border-[#96969635]
                                   backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] 
                                   font-semibold"
                  placeholder="Email"
                  required onChange={(e)=>setEmail(e.target.value)} value={email}
                />
    
                <input
                  type={show ? "text" : "password"}
                  className="w-[100%] h-[50px] border-[2px] border-[#96969635]
                                   backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] 
                                   font-semibold"
                  placeholder="Password"
                  required onChange={(e)=>setPassword(e.target.value)} value={password}
                />
                {!show && (
                  <FaRegEye
                    className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                    onClick={() => setShow((prev) => !prev)}
                  />
                )}
                {show && (
                  <FaEye
                    className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                    onClick={() => setShow((prev) => !prev)}
                  />
                )}
    
                <button
                  className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center
                                   mt-[20px] text-[17px] font-semibold cursor-pointer"
                >
                 Login
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Login