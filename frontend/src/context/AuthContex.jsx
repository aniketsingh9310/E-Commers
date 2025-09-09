import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContex = ({ children }) => {
    let serverUrl = "http://localhost:8000"

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
