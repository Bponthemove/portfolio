import React from 'react'
import { Link } from 'react-router-dom'
import Userfront from "@userfront/react"

const Login = () => {
    Userfront.init("vbqdqvnq")

    const LoginForm = Userfront.build({
    toolId: 'rodrlr'
    })

    return (
        <div className='login-form' id='main'>
            <p>please use the details below. <br/>This is not meant for people to provide their details, but as practice for me. <br/>I have set it up, just so that you can add likes, dislikes or comments. Please keep it nice 😉 .
            </p>
            <br/>
            <br/>
            <p>Username: test</p>
            <p>Password: test1234</p>
            <br/>
            <br/>
            <LoginForm />
            <p>or sign up <Link to='/signup'>here</Link> </p>
        </div>
    )
}

export default Login
