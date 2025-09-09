import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContex'
import axios from 'axios'

export const adminDataContext = createContext()

const AdminContext = ({ children }) => {
    const [adminData, setAdminData] = useState(null)
    const { serverUrl } = useContext(authDataContext)

    const getAdmin = async () => {
        try {
            let result = await axios.post(serverUrl + "/api/user/getadmin",{}, { withCredentials: true })
            setAdminData(result.data)
            console.log(result.data)
        } catch (e) {
            setAdminData(null)
            console.log(e)
        }
    }

    useEffect(() => {
        getAdmin()
    }, [])

    let value = {
        adminData,
        setAdminData,
        getAdmin
    }

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext
