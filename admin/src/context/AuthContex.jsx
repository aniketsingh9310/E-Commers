import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()
const AuthContex =({children}) =>  {
    let serverUrl = "https://e-commers-backend-7xm9.onrender.com"
    let value = {
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContex
