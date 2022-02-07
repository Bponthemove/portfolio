import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/index.css'

const NotFound = (incoming) => {
    return (
        <main className='main__notFound'>
            <h1>not found</h1>
            <NavLink to='/'>Go Back</NavLink>
        </main>
    )
}

export default NotFound
