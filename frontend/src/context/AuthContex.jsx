import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContex = ({ children }) => {
    let serverUrl = "https://e-commers-1-gm3w.onrender.com"

    let value = {
        serverUrl
    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContex
