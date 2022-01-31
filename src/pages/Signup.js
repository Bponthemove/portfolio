import React, { useContext } from 'react'
// import Userfront from "@userfront/react"
import { DataContext } from '../context/DataContext'

const Signup = () => {
    const { click, SignupForm } = useContext(DataContext)

    return (
        <main id={click ? 'mainNavOpen' : 'mainNavClosed'}>
            <div className='signup-form' id={click ? 'mainNavOpen' : 'mainNavClosed'}>
                <SignupForm />
            </div>
        </main>
    )
}

export default Signup
