import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()
const AuthContex =({children}) =>  {
    let serverUrl = "https://e-commers-backend-k9mi.onrender.com"
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
