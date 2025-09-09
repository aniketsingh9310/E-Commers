import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContex'
import axios from 'axios'


export const userDataContext = createContext()
const userContex = ({children}) => {
    let [userData,setUserData] = useState(null)
    let {serverUrl} = useContext(authDataContext)
   
    const getCurrentUser = async ( ) =>{
      try{
        let result = await axios.post(
  serverUrl + "/api/user/getcurrentuser",
  {},
  { withCredentials: true } 
)

        setUserData(result.data)
        console.log(result.data)
      }catch(e){
          setUserData(null)
          console.log(e)
      }
    }
    
    useEffect(()=>{
      getCurrentUser()
    },[])

    let value =  {
        userData,setUserData,getCurrentUser
    }
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default userContex