import { useState, useEffect } from 'react'
import Userfront from "@userfront/react"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [access, setAccess] = useState(false)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!Userfront.accessToken()) {
            navigate('/login')
        } else {
            setAccess(true)
            setUserData(JSON.stringify(Userfront.user, null, 2))
        }
    }, [])

    return (
        <>
            {!access && <p>...checking for authentication...</p>}
            {access && 
                <div>
                    <h2>Dashboard</h2>
                    <pre>{userData}</pre>
                </div>
            }
        </>
    )
}

export default Dashboard


