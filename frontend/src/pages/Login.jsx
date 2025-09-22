import React, { useState } from 'react'
import Logo from "../assets/vcart logo.png"
import { useNavigate } from 'react-router-dom'
import Google from '../assets/google1.png'
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { useContext } from 'react';
import { authDataContext } from '../context/authContex';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContex';
import { toast } from 'react-toastify';


const Login = () => {

  const [show,setShow] = useState("")
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {serverUrl} = useContext(AuthDataContext)
  const {getCurrentUser} = useContext(userDataContext)


  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()
    try{
      let result =  await axios.post(serverUrl + '/api/auth/login',{
        email,password
      },{withCredentials:true})
      console.log(result.data) 
      toast.success(" Login Successfully")
      
      getCurrentUser()
      navigate("/")
      

    }catch(e){
      console.log("login error")
      toast.error(" Login failed")
    }
  }

    const googleSignup = async() =>{
      try{
          const response = await signInWithPopup(auth,provider)
          let user = response.user
          let name = user.displayName;
          let email = user.email

          const result = await axios.post(serverUrl + "/api/auth/googleLogin" ,{name,email},
            {withCredentials:true})
            console.log(result.data)
                getCurrentUser()
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
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, Place your order
        </span>
      </div>
      <div
        className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blure-2xl rounded-lg shadow-lg
                flex items-center justify-center"
      >
        <form
          action="" onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] 
          cursor-pointer" onClick={googleSignup}>
            <img src={Google} alt="" className="w-[30px]" />
            Login account with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
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
              required onChange={(e)=>setPassword(e.target.value)}
            />
            {!show && (
              <FaRegEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <FaEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center
                               mt-[20px] text-[17px] font-semibold"
            >
             Login
            </button>
            <p className='flex gap-[10px]'>
              You haven't any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
