import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import Userfront from '@userfront/react'

const Dashboard = () => {
    const { token } = useContext(DataContext)
    const [access, setAccess] = useState(false)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
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


