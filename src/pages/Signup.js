import React, { useContext } from 'react'
import Userfront from "@userfront/react"
import { DataContext } from '../context/DataContext'

const Signup = () => {
    Userfront.init("vbqdqvnq")

    const { click } = useContext(DataContext)
    const SignupForm = Userfront.build({
        toolId: "maomdl"
      })

    return (
        <main id={click ? 'mainNavOpen' : 'mainNavClosed'}>
            <div className='signup-form' id={click ? 'mainNavOpen' : 'mainNavClosed'}>
                <SignupForm />
            </div>
        </main>
    )
}

export default Signup
