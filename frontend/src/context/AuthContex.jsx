import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContex = ({ children }) => {
    let serverUrl = "https://e-commers-backend-7xm9.onrender.com"

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
